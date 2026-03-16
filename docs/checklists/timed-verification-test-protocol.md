# Timed Verification Test Protocol

## Purpose
This protocol measures whether the planning verification workflow is improving in a commercially meaningful way.

It is designed to answer one question:

> Can a strong candidate move from low-confidence `Proceed with caution` to medium-confidence `Proceed with caution` quickly and repeatably?

This protocol should be used on the current top-tier candidates first.

---

## Primary test set
Run this protocol on:
1. 39 Park Rd, Nambour
2. 16 Mons Road, Buderim
3. 18A Quambi Place, Buderim

---

## Test objective
Measure:
1. verification time per decisive field
2. total time per site
3. confidence before verification
4. confidence after verification
5. recommendation before verification
6. recommendation after verification
7. which fields remain unresolved
8. whether the workflow is becoming commercially usable

---

## Pre-test setup
Before starting each site, record:
- Site ID:
- Address:
- Analyst:
- Date:
- Starting recommendation:
- Starting confidence:
- Starting critical unknown count:

Start a timer at the beginning of the verification pass.

---

## Timed field blocks
### Block 1 — Zone verification
Record:
- start time
- end time
- result
- source used
- verified / unknown

### Block 2 — Local plan / precinct verification
Record:
- start time
- end time
- result
- source used
- verified / unknown

### Block 3 — Minimum lot size / frontage verification
Record:
- start time
- end time
- result
- source used
- verified / unknown

### Block 4 — Overlay checks
Check:
- flood
- steep land / landslide
- biodiversity / waterways

Record:
- start time
- end time
- result per overlay
- source used
- verified / unknown

### Block 5 — Prior application history
Record:
- start time
- end time
- result
- source used
- verified / unknown

### Block 6 — Recommendation update
Record:
- start time
- end time
- updated recommendation
- updated confidence
- remaining critical unknown count

---

## Test worksheet
Use this per site.

| Block | Start | End | Minutes | Result | Status | Source | Notes |
|---|---|---|---:|---|---|---|---|
| Zone |  |  |  |  | verified / unknown |  |  |
| Local plan / precinct |  |  |  |  | verified / unknown |  |  |
| Minimum lot size / frontage |  |  |  |  | verified / unknown |  |  |
| Flood |  |  |  |  | pass / caution / fail / unknown |  |  |
| Steep land / landslide |  |  |  |  | pass / caution / fail / unknown |  |  |
| Biodiversity / waterways |  |  |  |  | pass / caution / fail / unknown |  |  |
| Prior application history |  |  |  |  | verified / unknown |  |  |
| Recommendation update |  |  |  |  | updated |  |  |

---

## Completion summary per site
Record:
- Total verification time:
- Starting recommendation:
- Final recommendation:
- Starting confidence:
- Final confidence:
- Starting critical unknown count:
- Final critical unknown count:
- Did confidence improve? yes / no
- Did recommendation improve? yes / no
- Main blocker still remaining:

---

## Batch-level review
After running all 3 sites, summarise:
1. average time per site
2. average time per field block
3. how many fields were actually verified
4. how many sites improved in confidence
5. how many sites improved in recommendation
6. the most frequent unresolved field

---

## Commercial interpretation rules
### Positive signal
The workflow is improving meaningfully if:
- at least 1–2 sites move from low confidence to medium confidence
- average verification time is commercially tolerable
- decisive fields are being verified more consistently

### Negative signal
The workflow is still too weak if:
- most critical fields remain unresolved
- confidence does not improve materially
- verification time is too long for a practical service workflow

---

## Decision gate
After the 3-site test, decide:

### Continue Narrow B if:
- confidence uplift is real
- verification time is acceptable
- the process is becoming repeatable

### Reposition as triage-only if:
- confidence remains low across the board
- verification throughput is still too weak
- authoritative source access remains too brittle

---

## Operator note
Do not estimate timing after the fact.
Use a live timer.

The purpose of this protocol is not to describe the workflow.
It is to measure whether the workflow is commercially viable.
