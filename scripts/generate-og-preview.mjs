import { createCanvas } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';

const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

const bg = '#0A0D11';
const panel = '#0F141B';
const text = '#F3F4F6';
const muted = '#A6B0BF';
const primary = '#7BA4FF';
const accent = '#CBB89D';
const line = 'rgba(255,255,255,0.08)';
const success = '#8BD0AA';
const warning = '#E7C07D';
const danger = '#F08B8B';

ctx.fillStyle = bg;
ctx.fillRect(0, 0, width, height);

const glow1 = ctx.createRadialGradient(210, 80, 0, 210, 80, 260);
glow1.addColorStop(0, 'rgba(123,164,255,0.26)');
glow1.addColorStop(1, 'rgba(123,164,255,0)');
ctx.fillStyle = glow1;
ctx.fillRect(0, 0, width, height);

const glow2 = ctx.createRadialGradient(980, 120, 0, 980, 120, 220);
glow2.addColorStop(0, 'rgba(203,184,157,0.16)');
glow2.addColorStop(1, 'rgba(203,184,157,0)');
ctx.fillStyle = glow2;
ctx.fillRect(0, 0, width, height);

roundRect(ctx, 42, 42, 1116, 546, 34, panel, line);

ctx.fillStyle = primary;
ctx.font = '500 22px "DejaVu Sans"';
ctx.fillText('FEASIBILITY INTELLIGENCE', 88, 110);

ctx.fillStyle = text;
ctx.font = '600 68px "DejaVu Sans"';
ctx.fillText('Subdivision screening,', 88, 206);
ctx.fillText('without the guesswork.', 88, 282);

ctx.fillStyle = muted;
ctx.font = '27px "DejaVu Sans"';
ctx.fillText('Get a fast first-pass result with constraints, yield, confidence, and the next step.', 88, 352);

roundRect(ctx, 88, 424, 262, 86, 24, '#0B1016', 'rgba(255,255,255,0.07)');
ctx.fillStyle = text;
ctx.font = '600 24px "DejaVu Sans"';
ctx.fillText('PASS / FAIL / REVIEW', 114, 472);
ctx.fillStyle = muted;
ctx.font = '18px "DejaVu Sans"';
ctx.fillText('Clear classification for fast screening.', 114, 500);

roundRect(ctx, 386, 424, 234, 86, 24, '#0B1016', 'rgba(255,255,255,0.07)');
ctx.fillStyle = text;
ctx.font = '600 24px "DejaVu Sans"';
ctx.fillText('Estimated yield', 412, 472);
ctx.fillStyle = muted;
ctx.font = '18px "DejaVu Sans"';
ctx.fillText('Deterministic lot heuristic.', 412, 500);

roundRect(ctx, 656, 424, 204, 86, 24, '#0B1016', 'rgba(255,255,255,0.07)');
ctx.fillStyle = text;
ctx.font = '600 24px "DejaVu Sans"';
ctx.fillText('Confidence', 682, 472);
ctx.fillStyle = muted;
ctx.font = '18px "DejaVu Sans"';
ctx.fillText('0–100% confidence score.', 682, 500);

roundRect(ctx, 904, 140, 190, 286, 28, '#0B1016', 'rgba(255,255,255,0.07)');
ctx.fillStyle = text;
ctx.font = '600 22px "DejaVu Sans"';
ctx.fillText('Outputs', 938, 186);

pill(ctx, 930, 220, 138, 38, 'PASS', success);
pill(ctx, 930, 276, 138, 38, 'REVIEW', warning);
pill(ctx, 930, 332, 138, 38, 'FAIL', danger);

ctx.fillStyle = accent;
ctx.font = '500 17px "DejaVu Sans"';
ctx.fillText('Professional first-pass', 930, 400);
ctx.fillText('subdivision screening.', 930, 425);

const outPath = path.join(process.cwd(), 'public/og/feasibility-intelligence-preview.png');
fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log(outPath);

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function pill(ctx, x, y, w, h, label, color) {
  roundRect(ctx, x, y, w, h, h / 2, 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.06)');
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + 18, y + h / 2, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = text;
  ctx.font = '600 16px "DejaVu Sans"';
  ctx.fillText(label, x + 34, y + 24);
}
