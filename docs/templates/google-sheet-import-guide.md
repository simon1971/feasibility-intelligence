# Google Sheet Import Guide

## Purpose
Create the live Phase 1 working sheet from the CSV templates in this repository.

## Tabs to create
1. Sites
2. Assessments
3. Rule Checks
4. Sources
5. Report Draft
6. Test Site Register

## Import order
1. Import `docs/templates/google-sheet-columns.csv` as the field model reference.
2. Import `data/test-sites/test-site-register.csv` into the `Test Site Register` tab.
3. Freeze header rows.
4. Add status dropdowns for: pass / fail / caution / unknown.
5. Add review status dropdowns for: draft / human_reviewed / final.

## Important
This environment may not always have direct Google Sheets write access. If live creation is unavailable, these CSV/template files are the source pack for immediate import.
