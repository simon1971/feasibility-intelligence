# Recommended Repo Structure

```text
feasibility-intelligence/
├── README.md
├── docs/
│   ├── specs/
│   │   ├── mvp-build-spec.md
│   │   ├── repo-structure.md
│   │   ├── scoring-decision-rules.md
│   │   ├── database-field-model.md
│   │   └── guardrails-disclaimers.md
│   ├── workflows/
│   │   ├── google-sheet-phase1-workflow.md
│   │   └── openclaw-agent-workflow.md
│   ├── templates/
│   │   ├── client-report-template.md
│   │   └── google-sheet-columns.csv
│   └── prompts/
│       └── subagent-prompt-pack.md
├── schemas/
│   └── site-assessment.schema.json
├── data/
│   └── test-sites/
│       ├── test-site-framework.md
│       └── sample-site-assessment.json
└── .gitignore
```

## Design logic
- `docs/specs/` holds the stable operating logic.
- `docs/workflows/` holds execution steps.
- `docs/templates/` holds reusable client/operator artefacts.
- `schemas/` holds the machine-readable contract.
- `data/test-sites/` holds fixtures and framework examples.
