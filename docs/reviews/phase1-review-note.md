# Phase 1 Review Note

## Executive summary
The first five real manual screens show that the MVP is directionally working, but the current bottleneck is not site discovery or listing analysis.

The bottleneck is **authoritative planning verification**.

The MVP is already doing three useful things:
1. distinguishing stronger and weaker listing candidates
2. resisting overconfidence from agent marketing language
3. preserving uncertainty rather than pretending to know planning outcomes

That is good.

What the MVP is not yet doing well enough is moving promising sites from **Hold / verify** into a more decision-useful recommendation quickly enough.

---

## Real-screen results to date
| Site | Recommendation | Score | Notes |
|---|---:|---:|---|
| 39 Park Rd, Nambour | Hold / verify | 56 | Strongest explicit development signal, but still too many unverified planning fields |
| 16 Mons Road, Buderim | Proceed with caution | 60 | Strongest raw landholding scale, but high planning and overlay uncertainty |
| 103 Carter Road, Nambour | Hold / verify | 54 | Plausible candidate, but weaker verified signal than Park Rd |
| 11 School Road, Bli Bli | Hold / verify | 48 | Larger lot, but weak development signal and no verified planning support |
| 27 Yoomba Crescent, Alexandra Headland | Hold / verify | 42 | Useful control case; lifestyle listing with weak subdivision signal |

---

## What worked
### 1. Candidate sourcing worked
The workaround browser workflow was sufficient to source real listings from Sunshine Coast LGA and build a practical test set.

### 2. The model ranked candidates in the expected order
The scoring outcomes broadly made sense:
- strongest urban redevelopment-style candidate near the top
- large strategic parcel next
- plausible mid-tier sites in the middle
- lifestyle/control case at the bottom

### 3. The workflow is conservatively honest
The MVP did not overstate feasibility from:
- lot size alone
- agent marketing language
- generic “future scope” claims

This is an important positive sign.

---

## What blocked progress
### 1. Zoning was not being verified quickly enough
The key failure mode is that the model can suspect zoning relevance but not confirm it rapidly from an authoritative source in the workflow.

### 2. Local plan / precinct remained unresolved too often
This left too many sites in a low-confidence state.

### 3. Overlay checks were not integrated tightly enough
The following were repeatedly unresolved:
- flood
- steep land / landslide
- biodiversity / waterways

### 4. Prior application history was not incorporated efficiently
The workflow recognises its importance but does not yet operationalise it fast enough.

---

## Interpretation
The current scoring logic is **not obviously wrong**.

The more important issue is that too many core fields remain `unknown`, which causes recommendations to cluster around **Hold / verify**.

That means:
- the model may be **appropriately conservative**, not excessively conservative
- but the surrounding workflow is not yet strong enough to feed it decisive planning inputs

In plain terms:
- the MVP can already rank candidate quality
- it cannot yet validate planning feasibility efficiently enough

---

## What this means commercially
At present, the MVP is useful as a **screening triage tool**, but not yet as a high-confidence rapid report engine.

Commercially, that means the strongest current value proposition is:

> “A disciplined early screen that filters weak sites and identifies what still needs verification.”

Not yet:

> “A near-final feasibility answer in one pass.”

That distinction matters.

---

## Recommended next steps
### Priority 1 — improve authoritative planning verification
Add a tighter operator workflow for:
1. zoning confirmation
2. local plan / precinct confirmation
3. minimum lot size / frontage rule confirmation
4. flood overlay check
5. steep land / landslide check
6. biodiversity / waterways check
7. prior application history check

### Priority 2 — create a verification checklist artefact
The workflow now needs a simple per-site planning-verification sheet or checklist that sits between:
- listing review
- final recommendation

### Priority 3 — adjust recommendation discipline slightly
Keep the current conservative logic, but introduce a clearer distinction between:
- **promising but unverified**
- **weak / likely non-starter**

That may mean making `Proceed with caution` easier to reach **only when raw site quality is strong and no obvious negative signal exists**, even if some planning fields remain outstanding.

### Priority 4 — do not automate parser work yet
Parser automation should remain deferred.

The current bottleneck is not parsing text.
It is verifying planning controls and overlays with enough confidence.

---

## Suggested tactical changes before more scaling
1. Create a structured **planning verification checklist**
2. Add a **site-screen summary table** comparing all five completed screens
3. Refine recommendation wording to distinguish:
   - strong candidate pending verification
   - middling candidate pending verification
   - weak/control candidate
4. Then run another batch of 5 sites

---

## Current judgement on the MVP
### What it is now
- a credible manual triage tool
- conservative
- useful for sorting and prioritising follow-up

### What it is not yet
- a planning-verification engine
- a high-confidence automated feasibility product
- ready for broad scaling without workflow refinement

---

## Recommended immediate next move
Create and use a **planning verification checklist** as the next artefact.

That is the highest-value improvement because it addresses the actual reason the first five screens stalled at low confidence.
