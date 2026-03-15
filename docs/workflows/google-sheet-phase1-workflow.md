# Google Sheet-First Workflow — Phase 1

## Objective
Launch the MVP with the least moving parts.

## Sheet tabs
1. **Sites** — one row per candidate site
2. **Assessments** — one row per assessment event
3. **Rule Checks** — detailed 12-rule outcomes
4. **Sources** — source references and verification flags
5. **Report Draft** — client-facing summary fields

## Suggested operator flow
1. Add site to `Sites`.
2. Create an assessment row in `Assessments`.
3. Complete the 12 rule checks in `Rule Checks`.
4. Log all references in `Sources`.
5. Generate a draft narrative in `Report Draft`.
6. Review placeholders and unknowns.
7. Issue recommendation.

## Phase 1 success metric
A competent analyst should be able to process one site in roughly 15–30 minutes using manual inputs.

## Column discipline
- Prefer fixed columns over freeform text where practical.
- Use controlled values for statuses: pass / fail / caution / unknown.
- Track `placeholder_flag` explicitly.
- Track `verified_flag` explicitly.

## Notes on planning references
Where exact Sunshine Coast planning controls are not yet fully verified for a site:
- leave the value as placeholder
- note the reference gap
- cap confidence accordingly
