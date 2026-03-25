#!/usr/bin/env python3
import json
import os
import sys
import uuid
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs
from zoneinfo import ZoneInfo

from google.oauth2 import service_account
from googleapiclient.discovery import build

HOST = os.environ.get('LEAD_CAPTURE_HOST', '127.0.0.1')
PORT = int(os.environ.get('LEAD_CAPTURE_PORT', '8091'))
SHEET_ID = os.environ['LEAD_CAPTURE_SHEET_ID']
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = os.environ['GOOGLE_APPLICATION_CREDENTIALS']
SITE_NAME = os.environ.get('LEAD_CAPTURE_SITE_NAME', 'Feasibility Intelligence')
SUBMISSIONS_DIR = Path(os.environ.get('LEAD_CAPTURE_SUBMISSIONS_DIR', '/home/claw/.openclaw/workspace/feasibility-intelligence/submissions'))
ANALYTICS_PATH = Path(os.environ.get('LEAD_CAPTURE_ANALYTICS_PATH', str(SUBMISSIONS_DIR / 'analytics.jsonl')))
BRISBANE = ZoneInfo('Australia/Brisbane')


def sheets_service():
    creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return build('sheets', 'v4', credentials=creds, cache_discovery=False)


def current_timestamp() -> str:
    return datetime.now(BRISBANE).strftime('%Y-%m-%d %H:%M:%S AEST')


def current_iso() -> str:
    return datetime.now(BRISBANE).isoformat()


def ensure_dirs():
    SUBMISSIONS_DIR.mkdir(parents=True, exist_ok=True)
    ANALYTICS_PATH.parent.mkdir(parents=True, exist_ok=True)


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


def append_analytics(event_name: str, payload: dict):
    ensure_dirs()
    row = {'timestamp': current_iso(), 'event': event_name, 'payload': payload}
    with ANALYTICS_PATH.open('a', encoding='utf-8') as f:
        f.write(json.dumps(row) + '\n')


def store_submission(email: str, payload: dict):
    ensure_dirs()
    safe_email = email.replace('@', '_at_').replace('/', '_')
    filename = f"{datetime.now(BRISBANE).strftime('%Y%m%dT%H%M%S')}-{safe_email}-{uuid.uuid4().hex[:8]}.json"
    path = SUBMISSIONS_DIR / filename
    with path.open('w', encoding='utf-8') as f:
        json.dump(payload, f, indent=2)
    return str(path)


class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path.rstrip('/') == '/request-preview-submit':
            self.handle_lead_submit()
            return
        if self.path.rstrip('/') == '/request-expert-review':
            self.handle_expert_review()
            return
        if self.path.rstrip('/') == '/track-event':
            self.handle_track_event()
            return
        self.send_error(404)

    def handle_lead_submit(self):
        length = int(self.headers.get('Content-Length', '0'))
        raw = self.rfile.read(length).decode('utf-8', errors='replace')
        data = parse_qs(raw)
        email = (data.get('email', ['']) or [''])[0].strip().lower()
        wants_json = 'application/json' in (self.headers.get('Accept', '') or '')

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
            self.respond_json(200, {'status': 'success', 'message': 'Request received. We will review it shortly.'}, wants_json)
        except Exception as exc:
            print(f'append_failed: {exc}', file=sys.stderr, flush=True)
            self.respond_json(502, {'status': 'error', 'message': 'Lead capture is temporarily unavailable.'}, wants_json)

    def handle_expert_review(self):
        payload = self.read_json_body()
        email = str(payload.get('email', '')).strip().lower()
        screening_input = payload.get('input')
        result = payload.get('result')

        if not email or '@' not in email:
            self.respond_json(400, {'message': 'Enter a valid email for expert review.'}, True)
            return
        if not isinstance(screening_input, dict) or not isinstance(result, dict):
            self.respond_json(400, {'message': 'Missing screening input or result.'}, True)
            return

        record = {
            'submitted_at_aest': current_timestamp(),
            'submitted_at_iso': current_iso(),
            'site': SITE_NAME,
            'email': email,
            'input': screening_input,
            'result': result,
        }

        try:
            stored_path = store_submission(email, record)
        except Exception as exc:
            print(f'submission_store_failed: {exc}', file=sys.stderr, flush=True)
            self.respond_json(502, {'message': 'Could not save the expert review request.'}, True)
            return

        self.respond_json(200, {'message': 'Expert review request saved.', 'stored_path': stored_path}, True)

    def handle_track_event(self):
        payload = self.read_json_body()
        event_name = str(payload.get('event', '')).strip()
        if not event_name:
            self.respond_json(400, {'message': 'Missing event name.'}, True)
            return
        try:
            append_analytics(event_name, payload.get('payload') or {})
        except Exception as exc:
            print(f'analytics_failed: {exc}', file=sys.stderr, flush=True)
        self.respond_json(200, {'ok': True}, True)

    def do_GET(self):
        if self.path.rstrip('/') == '/healthz':
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.end_headers()
            self.wfile.write(b'ok')
            return
        self.send_error(404)

    def read_json_body(self):
        length = int(self.headers.get('Content-Length', '0'))
        raw = self.rfile.read(length).decode('utf-8', errors='replace')
        return json.loads(raw or '{}')

    def respond_json(self, status_code: int, payload: dict, wants_json: bool):
        encoded = json.dumps(payload).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def log_message(self, fmt, *args):
        print(f'{self.address_string()} - - [{self.log_date_time_string()}] {fmt % args}', flush=True)


if __name__ == '__main__':
    ensure_dirs()
    server = HTTPServer((HOST, PORT), Handler)
    print(f'lead_capture_server listening on {HOST}:{PORT}', flush=True)
    server.serve_forever()
