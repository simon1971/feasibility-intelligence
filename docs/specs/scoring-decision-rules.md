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
2. Zone cannot be identified even provisionally.
3. Minimum lot size cannot be even provisionally identified.
4. The site is only weakly compelling and multiple critical planning fields remain unresolved.

## Suggested scoring method
For weighted checks:
- pass = 100% of rule weight
- caution = 50% of rule weight
- unknown = 25% of rule weight
- fail = 0% of rule weight

Mandatory gate rules are not added to score if failed; they trigger stop logic.

## Critical vs secondary unknowns
### Critical unknowns
These should strongly constrain recommendation:
- current zone
- local plan / precinct
- minimum lot size / subdivision trigger
- flood
- steep land / landslide
- biodiversity / waterways
- prior application history when clearly relevant

### Secondary unknowns
These should influence confidence but not automatically suppress a promising site:
- exact frontage measurement
- exact access geometry
- refined servicing assumptions
- tentative indicative lot count

## Raw site strength test
Classify each site before final recommendation:

### Strong raw site
At least 2 of the following are true:
- materially supportive site area
- corner block or strong access signal
- explicit development/redevelopment signal
- likely supportive urban context
- prior relevant approval/planning signal

### Moderate raw site
At least 1 of the above is true.

### Weak raw site
None of the above are meaningfully present.

## Recommendation mapping
- **80–100** → Proceed
- **60–79** → Proceed with caution
- **40–59** → Hold / verify
- **0–39** → Do not proceed

Override logic:
- Any verified fatal planning/physical constraint can override score to **do_not_proceed**.
- Strong raw candidates with no obvious negative signal may still qualify for **Proceed with caution** even when some critical planning verification remains outstanding.
- Moderate or weak raw candidates with multiple critical unknowns should remain capped at **hold_verify**.
- Placeholder minimum lot size references should cap confidence at **medium**.

## Recommendation discipline
### Proceed
Use only when major planning controls are mostly verified and no major overlay blocker is evident.

### Proceed with caution
Use when raw site strength is strong, no obvious screen-level fatal issue is present, and the site is clearly worth deeper work even though some critical planning verification remains outstanding.

### Hold / verify
Use when the site is plausible but not clearly compelling enough to escalate, or when critical unknowns remain too numerous for the current strength of the site.

### Do not proceed
Use when a verified fatal constraint exists, the site is outside MVP scope, or downside risk clearly dominates.

## Confidence rules
- **High**: all 12 rules addressed, no material unknowns, sources mostly verified.
- **Medium**: all key rules addressed, but 1–3 material unknowns or placeholder controls remain.
- **Low**: multiple unknowns, parser-proposed values not yet reviewed, or weak evidence chain.

## Placeholder discipline
Do not state unverified thresholds as definitive.
Use wording such as:
- "Placeholder pending verified planning reference"
- "Indicative only — requires planning scheme confirmation"
