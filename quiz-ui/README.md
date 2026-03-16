# Quiz UI

Interactive customer-validation quiz for the **Property Development Feasibility Intelligence Engine**.

## Purpose
This quiz is designed to test whether Sunshine Coast property developers and adjacent operators would pay for rapid feasibility screening reports.

It is intentionally lightweight:
- React + Vite
- TailwindCSS
- mobile-friendly flow
- one question per screen
- no heavy backend
- responses stored locally and persisted to a lightweight server-side endpoint on completion

## Run locally
```bash
cd quiz-ui
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build
```bash
npm run build
```

## Notes
- The quiz contains 17 validation questions.
- Results are shown on the final screen.
- Response JSON is printed to the browser console on completion.
- Responses are stored temporarily in local storage.
- Production deploy also posts completed responses to `/quiz/api/save-response.php` for later analysis.

## Future extension
Later phases can route the same response object to:
- Google Sheets
- a lightweight API endpoint
- a CRM
- a lead qualification workflow
