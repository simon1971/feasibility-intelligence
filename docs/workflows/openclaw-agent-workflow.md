# OpenClaw Agent Workflow

## Purpose
Use OpenClaw as a disciplined operator assistant for the MVP without over-automating Phase 1.

## Phase 1 workflow
1. Analyst opens a new target site.
2. Agent prepares a blank assessment from the schema/template.
3. Analyst manually collects:
   - zoning
   - local plan / precinct
   - minimum lot size reference
   - gross site area
   - frontage / access notes
   - flood indication
   - steep land / landslide indication
   - biodiversity / waterways indication
   - prior application history
4. Agent structures the inputs into JSON.
5. Agent applies scoring/decision rules.
6. Analyst reviews all placeholders and unknowns.
7. Agent produces a draft client-facing report.

## Phase 2 workflow
1. Analyst supplies source text / copied planning extracts / history notes.
2. Agent/parser proposes structured fields.
3. Human reviews each extracted field.
4. Final reviewed data is written to JSON.
5. Agent generates report draft.

## Agent constraints
- Never broaden outside Sunshine Coast LGA residential subdivision.
- Never invent planning references.
- Never convert uncertain thresholds into definitive claims.
- Always preserve an audit trail of assumptions and unknowns.
- Always mark human-review status.
