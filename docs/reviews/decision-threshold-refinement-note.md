# Decision Threshold Refinement Note

## Executive summary
The first five real screens show that the MVP should remain conservative, but the current recommendation logic is slightly too blunt.

Specifically, it is collapsing:
- **strong raw candidates pending verification**
- and **middling/weak candidates pending verification**

into the same `Hold / verify` category too often.

The refined logic should keep strict control around verified planning facts while making it easier for genuinely strong raw candidates to reach **Proceed with caution**.

---

## What the first five screens revealed
### Stronger raw candidates
- 16 Mons Road, Buderim
- 39 Park Rd, Nambour

These sites had enough positive signal that they were clearly worth deeper work, even though verification gaps remained.

### Middling candidates
- 103 Carter Road, Nambour
- 11 School Road, Bli Bli

These had some positive features, but not enough to justify escalation without stronger planning confirmation.

### Weak/control candidate
- 27 Yoomba Crescent, Alexandra Headland

This behaved as expected and should not be elevated without stronger evidence.

---

## Problem with the earlier logic
The earlier logic treated too many unknowns the same way, which caused good-but-unverified candidates to be held back alongside weaker sites.

This made the engine safe, but not optimally decision-useful.

---

## Refined recommendation logic
### 1. Split unknowns into two classes
#### Critical unknowns
These should strongly constrain recommendation:
- current zone
- local plan / precinct
- minimum lot size / subdivision trigger
- flood
- steep land / landslide
- biodiversity / waterways
- prior application history when clearly relevant

#### Secondary unknowns
These should influence confidence but not automatically suppress a promising site:
- exact frontage measurement
- exact access geometry
- refined servicing assumptions
- tentative indicative lot count

---

### 2. Add raw site strength as an explicit decision factor
A site should be assessed as:
- **Strong raw site**
- **Moderate raw site**
- **Weak raw site**

#### Strong raw site
At least 2 of the following are true:
- materially supportive site area
- corner block or strong access signal
- explicit development/redevelopment signal
- likely supportive urban context
- prior relevant approval/planning signal

#### Moderate raw site
At least 1 of the above is true.

#### Weak raw site
None of the above are meaningfully present.

---

### 3. Recommendation mapping
#### Proceed
Use only when:
- major planning controls are mostly verified
- no major overlay blocker is evident
- unknown count is low

#### Proceed with caution
Use when:
- raw site strength is **strong**
- no obvious screen-level fatal issue is present
- the site is clearly worth deeper work
- some critical planning verification is still outstanding

This category should be the primary home for **good but unverified** sites.

#### Hold / verify
Use when:
- raw site quality is moderate or weak
- critical unknowns remain too numerous
- or the site is plausible but not compelling enough to escalate

#### Do not proceed
Use when:
- outside Sunshine Coast LGA
- outside residential subdivision use case
- a verified fatal constraint exists
- or the site is clearly weak and likely dominated by downside risk

---

## Recommended interpretation of the first five sites under the refined logic
| Site | Refined view |
|---|---|
| 16 Mons Road | Proceed with caution |
| 39 Park Rd | Proceed with caution |
| 103 Carter Road | Hold / verify |
| 11 School Road | Hold / verify |
| 27 Yoomba Crescent | Hold / verify |

This produces a more useful and commercially realistic spread.

---

## Why this is superior
This refinement:
- keeps the model conservative on verified planning facts
- better separates strong candidates from weak ones
- supports commercial triage more effectively
- avoids over-relying on raw unknown-count alone

---

## Recommended next action
Adopt this refined recommendation logic as the new Phase 1 decision rule set, then re-evaluate the five screened sites under the updated framework.
