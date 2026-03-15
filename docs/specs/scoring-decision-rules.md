# Scoring and Decision Rules

## Purpose
Provide a practical screening layer for Phase 1. This is not a statutory determination.

## Rule weighting
Use simple weighted scoring to keep Phase 1 fast.

| Rule | Weight | Notes |
|---|---:|---|
| In Sunshine Coast LGA | mandatory gate | Outside LGA = stop |
| Residential subdivision use case | mandatory gate | Non-target use case = stop |
| Current zone identified | 10 | Unknown zone reduces confidence |
| Local plan / precinct identified | 10 | Unknown = caution |
| Minimum lot size identified | 15 | Placeholder threshold must be marked |
| Gross site area captured | 5 | Missing area = hold |
| Effective yield calculated | 15 | Based on transparent assumptions only |
| Frontage/access checked | 10 | Physical practicality matters |
| Flood checked | 10 | Constraint may move outcome to caution/stop |
| Steep land / landslide checked | 10 | Constraint may materially reduce yield |
| Biodiversity / waterways checked | 10 | Potential screen blocker |
| Prior application history checked | 5 | Relevant refusal/history can alter recommendation |

## Gate rules
Immediate **do_not_proceed** if:
1. Site is not in Sunshine Coast LGA.
2. Intended use case is not residential subdivision.
3. A clear screen-level fatal constraint is identified from verified evidence.

Immediate **hold_verify** if:
1. Gross site area is missing.
2. Zone cannot be identified.
3. Minimum lot size cannot be even provisionally identified.
4. Flood / steep land / biodiversity-waterway status is completely unknown.

## Suggested scoring method
For weighted checks:
- pass = 100% of rule weight
- caution = 50% of rule weight
- unknown = 25% of rule weight
- fail = 0% of rule weight

Mandatory gate rules are not added to score if failed; they trigger stop logic.

## Recommendation mapping
- **80–100** → Proceed
- **60–79** → Proceed with caution
- **40–59** → Hold / verify
- **0–39** → Do not proceed

Override logic:
- Any verified fatal planning/physical constraint can override score to **do_not_proceed**.
- More than 3 material unknowns should cap outcome at **hold_verify**.
- Placeholder minimum lot size references should cap confidence at **medium**.

## Confidence rules
- **High**: all 12 rules addressed, no material unknowns, sources mostly verified.
- **Medium**: all key rules addressed, but 1–3 material unknowns or placeholder controls remain.
- **Low**: multiple unknowns, parser-proposed values not yet reviewed, or weak evidence chain.

## Placeholder discipline
Do not state unverified thresholds as definitive.
Use wording such as:
- "Placeholder pending verified planning reference"
- "Indicative only — requires planning scheme confirmation"
