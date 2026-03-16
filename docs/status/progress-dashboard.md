# Progress Dashboard

## Executive summary
This repository now contains the MVP foundation for a narrow property feasibility engine focused only on **Sunshine Coast LGA residential subdivision screening**.

The project is currently at:
- **Foundation complete**
- **Manual workflow pack complete**
- **Test register prepared**
- **Real site screening not yet started**
- **Parser automation intentionally deferred**

---

## Current phase status
| Area | Status | Notes |
|---|---|---|
| Scope lock | Done | Narrow scope documented and held |
| MVP build spec | Done | Core build direction defined |
| Repo structure | Done | Stable folder model established |
| JSON schema | Done | Assessment contract created |
| Scoring / decision rules | Done | Simple weighted screening logic created |
| OpenClaw workflow | Done | Human-reviewed workflow defined |
| Client report template | Done | Early report structure created |
| Database field model | Done | Sheet-to-JSON compatible model created |
| Google Sheet-first workflow | Done | Manual workflow documented |
| Google Sheet import pack | Done | CSV/template pack ready |
| 20-site test register | Done | Includes first 5 example rows |
| Blank Phase 1 assessment pack | Done | Ready for immediate use |
| Real manual screens | Not started | Requires actual candidate sites and source review |
| Live Google Sheet creation | Not confirmed | Environment shows `gws` installed, write path not yet proven |
| Parser automation | Deferred | Intentionally delayed until manual workflow is stable |
| Report generator automation | Deferred | Phase 3 only |

---

## What is done
### Core foundation
- `README.md`
- `docs/specs/mvp-build-spec.md`
- `docs/specs/repo-structure.md`
- `schemas/site-assessment.schema.json`
- `docs/specs/scoring-decision-rules.md`
- `docs/specs/database-field-model.md`
- `docs/specs/guardrails-disclaimers.md`

### Workflow and reporting
- `docs/workflows/openclaw-agent-workflow.md`
- `docs/workflows/google-sheet-phase1-workflow.md`
- `docs/templates/client-report-template.md`
- `docs/templates/google-sheet-columns.csv`
- `docs/templates/google-sheet-import-guide.md`
- `docs/notes/manual-screening-tightening.md`

### Test and assessment pack
- `data/test-sites/test-site-framework.md`
- `data/test-sites/test-site-register.csv`
- `data/test-sites/sample-site-assessment.json`
- `data/test-sites/templates/phase1-assessment-blank.json`
- `data/test-sites/templates/phase1-assessment-checklist.md`
- `data/test-sites/manual-screens/README.md`

---

## What is next
1. Confirm whether a live Google Sheet should be created from this environment or manually imported.
2. Nominate 5 real candidate sites.
3. Complete 5 genuine manual screens using the blank template pack.
4. Tighten recommendation consistency based on real cases, not examples.
5. Only then assess whether Phase 2 parser work is justified.

---

## What is blocked / pending
| Item | Status | Dependency |
|---|---|---|
| 5 real manual screens | Pending | Requires real target sites |
| Live Google Sheet creation | Pending | Requires confirmed working Sheets write path |
| Recommendation calibration from live cases | Pending | Requires completed manual screens |
| Parser decision | Pending | Requires stable manual workflow evidence |

---

## Key artefacts to inspect first
### Best top-down view
- `README.md`
- `docs/specs/mvp-build-spec.md`

### Best operational view
- `data/test-sites/test-site-register.csv`
- `data/test-sites/templates/phase1-assessment-blank.json`
- `data/test-sites/templates/phase1-assessment-checklist.md`

### Best workflow view
- `docs/workflows/google-sheet-phase1-workflow.md`
- `docs/notes/manual-screening-tightening.md`
- `docs/templates/google-sheet-import-guide.md`

---

## Next 3 actions
1. Decide whether to use CSV import or direct Google Sheet creation.
2. Provide 5 real Sunshine Coast candidate subdivision sites.
3. Run the first 5 manual screens and compare outcomes for consistency.

---

## Key risks / bottlenecks
1. **Verified planning references**
   - Main execution bottleneck.
   - Especially zoning, precinct controls, minimum lot size, and overlays.

2. **False precision risk**
   - Placeholder controls can create overconfidence if not clearly flagged.

3. **Yield simplification risk**
   - Effective yield is useful for screening but can mislead if treated as design reality.

4. **Recommendation drift**
   - Without real site calibration, analysts may apply `Proceed` / `Hold` / `Do not proceed` inconsistently.

5. **Scope creep**
   - The highest strategic risk is broadening into general feasibility, GIS productisation, or non-Sunshine Coast use cases too early.

---

## Current recommendation
The correct next move is **not** automation.

The correct next move is:
1. establish the working sheet,
2. select 5 real sites,
3. perform 5 genuine manual screens,
4. then tighten the model from evidence.
