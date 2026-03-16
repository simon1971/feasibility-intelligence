# Quiz UI

Interactive customer-validation quiz for the **Property Development Feasibility Intelligence Engine**.

## Purpose
This quiz is designed to test whether Sunshine Coast property developers and adjacent operators would pay for rapid feasibility screening reports.

It is intentionally lightweight:
- React + Vite
- TailwindCSS
- mobile-friendly flow
- one question per screen
- no backend required for MVP
- responses logged to console and stored temporarily in local storage

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
- Responses are also stored temporarily in local storage for MVP convenience.

## Future extension
Later phases can send the same response object to:
- a lightweight API endpoint
- a CRM
- a form backend
- a lead qualification workflow
