#!/usr/bin/env python3
import json
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs

from google.oauth2 import service_account
from googleapiclient.discovery import build

PORT = int(os.environ.get('LEAD_CAPTURE_PORT', '8091'))
SHEET_ID = os.environ['LEAD_CAPTURE_SHEET_ID']
SUCCESS_URL = os.environ.get(
    'LEAD_CAPTURE_SUCCESS_URL',
    'https://feasibility-intelligence.thedeploylab.au/request-preview-success',
)
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = os.environ['GOOGLE_APPLICATION_CREDENTIALS']


def sheets_service():
    creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return build('sheets', 'v4', credentials=creds, cache_discovery=False)


class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path.rstrip('/') != '/request-preview-submit':
            self.send_error(404)
            return

        length = int(self.headers.get('Content-Length', '0'))
        raw = self.rfile.read(length).decode('utf-8', errors='replace')
        data = parse_qs(raw)

        honey = (data.get('_honey', ['']) or [''])[0].strip()
        email = (data.get('email', ['']) or [''])[0].strip()
        if honey:
            self.redirect(SUCCESS_URL)
            return
        if not email or '@' not in email:
            self.send_error(400, 'Invalid email')
            return

        user_agent = self.headers.get('User-Agent', '')[:500]
        forwarded_for = self.headers.get('X-Forwarded-For', '')[:200]
        row = [[self.log_date_time_string(), email, 'feasibility-intelligence-site', user_agent, forwarded_for]]

        try:
            svc = sheets_service()
            svc.spreadsheets().values().append(
                spreadsheetId=SHEET_ID,
                range='Sheet1!A:E',
                valueInputOption='USER_ENTERED',
                insertDataOption='INSERT_ROWS',
                body={'values': row},
            ).execute()
        except Exception as exc:
            print(f'append_failed: {exc}', file=sys.stderr, flush=True)
            self.send_error(502, 'Lead capture unavailable')
            return

        self.redirect(SUCCESS_URL)

    def do_GET(self):
        if self.path.rstrip('/') == '/healthz':
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.end_headers()
            self.wfile.write(b'ok')
            return
        self.send_error(404)

    def redirect(self, location: str):
        self.send_response(303)
        self.send_header('Location', location)
        self.end_headers()

    def log_message(self, fmt, *args):
        print(f'{self.address_string()} - - [{self.log_date_time_string()}] {fmt % args}', flush=True)


if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', PORT), Handler)
    print(f'lead_capture_server listening on 127.0.0.1:{PORT}', flush=True)
    server.serve_forever()
