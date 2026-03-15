# MVP Database Field Model

## Principle
Keep the data model flat enough for Google Sheets in Phase 1, while remaining compatible with JSON export later.

## Core entities
### 1. Site
- site_id
- site_name
- address_text
- lot_plan
- suburb
- lga_name
- gross_site_area_sqm
- frontage_m
- access_notes

### 2. Assessment
- assessment_id
- site_id
- assessment_phase
- analyst
- assessment_date
- review_status
- overall_score
- recommendation
- confidence
- summary_notes

### 3. Rule results
For each of the 12 rules capture:
- rule_code
- rule_name
- status
- evidence_note
- source_reference
- verified_flag
- placeholder_flag

### 4. Constraint detail
- flood_status
- flood_notes
- steep_land_status
- steep_land_notes
- biodiversity_waterways_status
- biodiversity_waterways_notes

### 5. Yield detail
- minimum_lot_size_sqm
- minimum_lot_size_placeholder_flag
- assumed_efficiency_ratio
- effective_yield_area_sqm
- indicative_lot_count
- yield_notes

### 6. History
- prior_application_history_checked
- relevant_history_found
- history_notes

### 7. Audit
- created_at
- updated_at
- data_entry_method
- human_review_required
- human_review_completed
