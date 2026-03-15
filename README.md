# feasibility-intelligence

Narrow MVP foundation for a property development feasibility engine focused only on **Sunshine Coast LGA residential subdivision screening**.

## Scope
This repository is intentionally narrow.

Included:
- Sunshine Coast LGA only
- Residential subdivision screening only
- Phase 1 manual Google Sheet workflow
- Structured assessment template
- Human-reviewed planning inputs
- Structured JSON output
- Client-facing screening report template

Excluded from MVP:
- Other LGAs
- Other use cases (duplex, townhouse, units, commercial, industrial)
- Automated legal/planning advice
- Full GIS platform
- Public UI
- Definitive statutory threshold claims without verification

## MVP sequence
- **Phase 1** — manual Google Sheet + structured template + 20 test sites + no UI
- **Phase 2** — semi-automated parser for planning/overlay/history inputs, still human reviewed
- **Phase 3** — report generator from structured JSON

## Core rule set (12-rule MVP)
1. In Sunshine Coast LGA
2. Residential subdivision use case
3. Current zone identified
4. Local plan / precinct identified
5. Minimum lot size identified
6. Gross site area captured
7. Effective yield calculated
8. Frontage/access checked
9. Flood checked
10. Steep land / landslide checked
11. Biodiversity / waterways checked
12. Prior application history checked

## Operating principle
Fastest path to commercially useful Phase 1 MVP. No over-engineering.
