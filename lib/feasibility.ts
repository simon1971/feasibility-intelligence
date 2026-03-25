export type SlopeCategory = 'flat' | 'moderate' | 'steep';
export type OverlayStatus = 'none' | 'present' | 'restrictive';
export type ZoningStatus = 'unknown' | 'residential' | 'non-residential';
export type Classification = 'PASS' | 'FAIL' | 'REVIEW';

export type ScreeningInput = {
  address: string;
  zoning: ZoningStatus;
  landSizeM2: number;
  frontageM?: number | null;
  slopeCategory: SlopeCategory;
  overlayStatus: OverlayStatus;
};

export type ScreeningResult = {
  classification: Classification;
  estimated_yield: number;
  score: number;
  confidence: number;
  constraints: string[];
  recommendation: string;
};

export function evaluateFeasibility(input: ScreeningInput): ScreeningResult {
  const constraints: string[] = [];
  const hasFrontage = typeof input.frontageM === 'number' && Number.isFinite(input.frontageM);
  const frontage = hasFrontage ? Number(input.frontageM) : null;
  const zoningUnknown = input.zoning === 'unknown';
  const inferredZoning = zoningUnknown;
  const missingInputs = Number(!hasFrontage) + Number(zoningUnknown);

  const hardFail =
    input.landSizeM2 < 400 ||
    input.zoning === 'non-residential' ||
    input.overlayStatus === 'restrictive';

  let estimatedLots = Math.floor(input.landSizeM2 / 300);

  if (frontage !== null) {
    if (frontage < 10) estimatedLots = 1;
    if (frontage >= 20) estimatedLots += 1;
  }

  if (input.slopeCategory === 'moderate') estimatedLots -= 1;
  if (input.slopeCategory === 'steep') estimatedLots -= 2;

  estimatedLots = Math.max(1, estimatedLots);

  let score = 100;

  if (input.landSizeM2 < 600) {
    score -= 20;
    constraints.push('Block size limits subdivision potential');
  }

  if (input.slopeCategory === 'moderate') {
    score -= 15;
    constraints.push('Slope introduces development cost risk');
  }

  if (input.slopeCategory === 'steep') {
    score -= 35;
    constraints.push('Steep slope materially reduces efficient site yield');
  }

  if (input.overlayStatus !== 'none') {
    score -= 25;
    constraints.push(
      input.overlayStatus === 'restrictive'
        ? 'Restrictive overlay likely prevents straightforward development'
        : 'Overlay may restrict development'
    );
  }

  if (!hasFrontage) {
    score -= 10;
    constraints.push('Frontage may limit access or subdivision layout');
  }

  if (zoningUnknown) {
    score -= 20;
    constraints.push('Zoning is unknown and needs confirmation');
  }

  if (input.zoning === 'non-residential') {
    constraints.push('Zoning is non-residential and conflicts with subdivision use');
  }

  score = Math.max(0, score);

  let classification: Classification;
  if (hardFail) {
    classification = 'FAIL';
  } else if (score >= 70 && estimatedLots >= 2) {
    classification = 'PASS';
  } else if (score >= 40 && score <= 69) {
    classification = 'REVIEW';
  } else {
    classification = 'FAIL';
  }

  let confidence = 90;
  if (missingInputs > 0) confidence -= 20;
  if (inferredZoning) confidence -= 15;
  if (!hasFrontage) confidence -= 10;
  confidence = Math.max(0, Math.min(100, confidence));

  let recommendation: string;
  if (classification === 'PASS') {
    recommendation = 'Proceed to detailed feasibility or engage planner';
  } else if (classification === 'REVIEW') {
    recommendation = 'Requires expert assessment before proceeding';
  } else {
    recommendation = 'Site unlikely to be viable for subdivision';
  }

  return {
    classification,
    estimated_yield: estimatedLots,
    score,
    confidence,
    constraints: [...new Set(constraints)],
    recommendation,
  };
}
