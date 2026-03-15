# MVP Build Spec — Sunshine Coast Residential Subdivision Screening

## 1. Objective
Build the narrowest commercially useful MVP for early-stage residential subdivision screening in Sunshine Coast LGA.

The MVP must answer one practical question:

> Is this site worth progressing to a deeper feasibility review for residential subdivision, based on a disciplined 12-rule screen?

This is a **screening engine**, not a planning opinion, survey, legal advice product, or development approval engine.

## 2. Scope lock
### Included
- Sunshine Coast LGA only
- Residential subdivision screening only
- Existing lot / site level screening
- Manual capture first
- Human-reviewed planning references
- JSON structured assessment output
- Simple score / recommendation layer
- Client-facing summary report template

### Excluded
- Non-Sunshine Coast councils
- Non-subdivision residential outcomes
- Yield optimisation beyond simple effective-yield logic
- Automated GIS certainty claims
- DA drafting
- Financial feasibility modelling beyond screening status
- UI/product polish

## 3. User
Primary user:
- Operator/analyst screening sites for acquisition or client advice.

Secondary user:
- Client receiving a structured screening summary.

## 4. Output required per site
Each site assessment must produce:
- site identifier
- address / lot-plan placeholders
- 12-rule checklist outcome
- evidence notes per rule
- source references captured
- uncertainty flags
- recommendation status
- confidence level
- next actions

## 5. Phase design
### Phase 1 — manual, fast, useful
Deliverables:
- Google Sheet-first workflow
- structured site assessment template
- JSON schema
- decision/scoring rules
- 20 test-site framework
- report template
- guardrails/disclaimers

Standard:
- Human enters planning, overlay, and history data manually.
- All uncertain controls remain explicitly marked as placeholders until verified.
- No automation required for launch.

### Phase 2 — semi-automated parser
Deliverables:
- parser input spec
- extracted fields for zone / precinct / overlays / history
- confidence flags
- mandatory human review step

Standard:
- Parser may propose values.
- Human must confirm before assessment is final.

### Phase 3 — report generation
Deliverables:
- structured JSON to report mapping
- repeatable report template generation
- recommendation narrative generation from validated fields only

## 6. Commercial usefulness threshold
Phase 1 is useful if it can:
- assess 20 test sites consistently
- produce repeatable outcomes across analysts
- surface obvious no-go constraints early
- identify uncertainty requiring planner/surveyor/legal confirmation
- support a client-facing screening summary within 15–30 minutes per site

## 7. Non-negotiables
- No broadening beyond Sunshine Coast LGA residential subdivision.
- No pretending placeholder planning thresholds are verified.
- No legal/planning certainty language unless source-verified.
- No UI work before workflow quality is proven.

## 8. Recommendation statuses
- **Proceed** — no major screen-level blocker identified; move to deeper feasibility.
- **Proceed with caution** — possible pathway, but material uncertainty or constraint exists.
- **Hold / verify** — critical unknowns prevent a reliable screen outcome.
- **Do not proceed** — screen-level blocker identified.
