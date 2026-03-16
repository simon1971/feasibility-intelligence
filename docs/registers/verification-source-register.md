# Verification Source Register

## Purpose
This register defines the exact source stack to use for Phase 1 planning verification.

It exists to improve:
1. source access reliability
2. source retrieval workflow
3. repeatability of council/site-report checks

This is the operational source map for Narrow B.

---

## Operator rule
For each site, use sources in the order listed here.

Do not improvise source order unless:
- the primary source fails
- or the primary source clearly cannot answer the field required

For each field, record:
- source used
- value found
- status (`verified`, `unknown`, `caution`, `fail` as appropriate)
- any fallback used

---

## Source register
| Source | Primary purpose | Fields answered | Exact/starting URL | Fallback | Common failure mode | Operator note |
|---|---|---|---|---|---|---|
| Sunshine Coast Development.i / property search | Site-level property context and planning entry point | Zone, property context, application history entry path, possible overlay/site report clues | `https://developmenti.sunshinecoast.qld.gov.au/Property/NewPropertySearch` | broader Sunshine Coast planning pages or manual property search within council tools | difficult site matching, unstable browser access, no direct deep link surfaced | Use first for site identity and planning context, not for extended wandering |
| Sunshine Coast planning scheme / local plan mapping | Confirm local plan and precinct | Local plan applies, precinct/sub-precinct, planning map context | `https://www.sunshinecoast.qld.gov.au/Development/Planning-documents` (or council planning scheme landing path) | local plan PDFs/maps or council planning docs surfaced via search | mapping/PDF friction, hard-to-navigate documents | Use only to answer local plan/precinct questions |
| Sunshine Coast overlay mapping / environmental-hazard map path | Confirm site constraints | Flood, steep land / landslide, biodiversity / waterways, other overlay constraints | Council overlay/map path as available from planning or Development.i entry | council mapping references surfaced via public search | overlay layers hard to reach from session/browser | Treat each overlay as a separate field; do not bundle all as one vague check |
| Sunshine Coast application history / PD-style search | Confirm prior applications | Relevant prior application found, application number, status/outcome, support/caution effect | Development.i / application history path | public search results referencing DA numbers or council notices | hard to find site-specific history quickly | Only record history as verified when application reference or official record is found |
| realestate.com.au listing | Listing-led screening input only | Gross site area, address, raw signal, access hints, marketing claims | listing URL | Domain / agent listing / third-party property pages | marketing claims presented as fact | Never treat listing claims as authoritative planning confirmation |
| Domain / agent page / third-party property pages | Supporting context only | Cross-check of lot size, price, broad property context | case-by-case | listing page or public property profile | not authoritative for planning controls | Use only as secondary corroboration, not decisive planning evidence |

---

## Field-to-source map
### 1. Site identity
Preferred source order:
1. listing
2. Development.i / property search
3. third-party property profile if needed

### 2. Current zone
Preferred source order:
1. Development.i / site report / property planning context
2. planning scheme mapping
3. if unresolved → `unknown`

### 3. Local plan / precinct
Preferred source order:
1. planning scheme/local plan mapping
2. Development.i if it exposes local plan context
3. if unresolved → `unknown`

### 4. Minimum lot size / frontage
Preferred source order:
1. planning scheme/local plan controls
2. council planning documents / code references
3. if unresolved → `unknown`

### 5. Flood
Preferred source order:
1. council overlay mapping
2. Development.i if overlay/site report includes it
3. if unresolved → `unknown`

### 6. Steep land / landslide
Preferred source order:
1. council overlay mapping
2. Development.i if overlay/site report includes it
3. if unresolved → `unknown`

### 7. Biodiversity / waterways
Preferred source order:
1. council overlay mapping
2. Development.i if overlay/site report includes it
3. if unresolved → `unknown`

### 8. Prior application history
Preferred source order:
1. Development.i / application history path
2. official council application references surfaced publicly
3. if unresolved → `unknown`

---

## Failure handling rules
### If primary source fails
- record the failure
- use the listed fallback
- do not silently substitute a weaker source without marking it

### If fallback also fails
- mark field `unknown`
- do not estimate
- do not let a listing claim fill the gap unless explicitly marked as unverified

### If browser/relay path is unstable
- use fresh tabs only
- one source per tab
- one site at a time
- avoid reusing stale attached tabs

---

## Repeatability rules
To make verification repeatable:
1. use the same source order every time
2. use the verified-field worksheet every time
3. record timing for each verification block when running timed tests
4. treat unresolved fields consistently as `unknown`

---

## Commercial interpretation rule
The source stack is good enough only when it allows:
- decisive fields to be found consistently
- in commercially tolerable time
- across more than one strong candidate

If it cannot do that, the MVP remains stronger as a triage-and-escalation workflow than a high-confidence rapid screening engine.
