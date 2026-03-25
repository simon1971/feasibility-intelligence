#!/usr/bin/env python3
import json
import os
import sys
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

from google.oauth2 import service_account
from googleapiclient.discovery import build

HOST = os.environ.get('LEAD_CAPTURE_HOST', '127.0.0.1')
PORT = int(os.environ.get('LEAD_CAPTURE_PORT', '8091'))
SHEET_ID = os.environ['LEAD_CAPTURE_SHEET_ID']
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = os.environ['GOOGLE_APPLICATION_CREDENTIALS']
DISCORD_CHANNEL_ID = os.environ.get('LEAD_CAPTURE_DISCORD_CHANNEL_ID', '').strip()
DISCORD_BOT_TOKEN = os.environ.get('LEAD_CAPTURE_DISCORD_BOT_TOKEN', '').strip()
SITE_NAME = os.environ.get('LEAD_CAPTURE_SITE_NAME', 'Feasibility Intelligence')
BRISBANE = ZoneInfo('Australia/Brisbane')


def sheets_service():
    creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return build('sheets', 'v4', credentials=creds, cache_discovery=False)


def current_timestamp() -> str:
    return datetime.now(BRISBANE).strftime('%Y-%m-%d %H:%M:%S AEST')


def existing_emails(service):
    res = service.spreadsheets().values().get(spreadsheetId=SHEET_ID, range='Sheet1!B2:B').execute()
    rows = res.get('values', [])
    return {str(row[0]).strip().lower() for row in rows if row and str(row[0]).strip()}


def append_row(service, values):
    return service.spreadsheets().values().append(
        spreadsheetId=SHEET_ID,
        range='Sheet1!A:F',
        valueInputOption='USER_ENTERED',
        insertDataOption='INSERT_ROWS',
        body={'values': [values]},
    ).execute()


def notify_discord(email: str, timestamp: str):
    if not DISCORD_CHANNEL_ID or not DISCORD_BOT_TOKEN:
        return
    content = (
        f'New request preview lead for {SITE_NAME}\n'
        f'- Email: {email}\n'
        f'- Submitted: {timestamp}'
    )
    body = json.dumps({'content': content}).encode('utf-8')
    req = Request(
        f'https://discord.com/api/v10/channels/{DISCORD_CHANNEL_ID}/messages',
        data=body,
        headers={
            'Authorization': f'Bot {DISCORD_BOT_TOKEN}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )
    with urlopen(req, timeout=10) as resp:
        if resp.status not in (200, 201):
            raise RuntimeError(f'discord status {resp.status}')


class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path.rstrip('/') != '/request-preview-submit':
            self.send_error(404)
            return

        length = int(self.headers.get('Content-Length', '0'))
        raw = self.rfile.read(length).decode('utf-8', errors='replace')
        data = parse_qs(raw)

        honey = (data.get('_honey', ['']) or [''])[0].strip()
        email = (data.get('email', ['']) or [''])[0].strip().lower()
        wants_json = 'application/json' in (self.headers.get('Accept', '') or '')

        if honey:
            self.respond_json(200, {'status': 'ok', 'message': 'Request received.'}, wants_json)
            return
        if not email or '@' not in email:
            self.respond_json(400, {'status': 'error', 'message': 'Enter a valid work email.'}, wants_json)
            return

        user_agent = self.headers.get('User-Agent', '')[:500]
        forwarded_for = self.headers.get('X-Forwarded-For', '')[:200]
        timestamp = current_timestamp()

        try:
            svc = sheets_service()
            seen = existing_emails(svc)
            if email in seen:
                self.respond_json(200, {'status': 'duplicate', 'message': 'This email is already in the request queue.'}, wants_json)
                return

            append_row(svc, [timestamp, email, SITE_NAME, 'new', user_agent, forwarded_for])
            try:
                notify_discord(email, timestamp)
            except Exception as exc:
                print(f'discord_notify_failed: {exc}', file=sys.stderr, flush=True)
            self.respond_json(200, {'status': 'success', 'message': 'Request received. We will review it shortly.'}, wants_json)
        except Exception as exc:
            print(f'append_failed: {exc}', file=sys.stderr, flush=True)
            self.respond_json(502, {'status': 'error', 'message': 'Lead capture is temporarily unavailable.'}, wants_json)

    def do_GET(self):
        if self.path.rstrip('/') == '/healthz':
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.end_headers()
            self.wfile.write(b'ok')
            return
        self.send_error(404)

    def respond_json(self, status_code: int, payload: dict, wants_json: bool):
        if wants_json:
            encoded = json.dumps(payload).encode('utf-8')
            self.send_response(status_code)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(encoded)))
            self.end_headers()
            self.wfile.write(encoded)
            return

        if payload.get('status') in ('success', 'duplicate'):
            self.send_response(303)
            self.send_header('Location', 'https://feasibility-intelligence.thedeploylab.au/request-preview-success')
            self.end_headers()
            return

        self.send_error(status_code, payload.get('message', 'Request failed'))

    def log_message(self, fmt, *args):
        print(f'{self.address_string()} - - [{self.log_date_time_string()}] {fmt % args}', flush=True)


if __name__ == '__main__':
    server = HTTPServer((HOST, PORT), Handler)
    print(f'lead_capture_server listening on {HOST}:{PORT}', flush=True)
    server.serve_forever()
