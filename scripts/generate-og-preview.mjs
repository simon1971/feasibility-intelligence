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

ctx.fillStyle = bg;
ctx.fillRect(0, 0, width, height);

const glow1 = ctx.createRadialGradient(240, 96, 0, 240, 96, 280);
glow1.addColorStop(0, 'rgba(123,164,255,0.18)');
glow1.addColorStop(1, 'rgba(123,164,255,0)');
ctx.fillStyle = glow1;
ctx.fillRect(0, 0, width, height);

const glow2 = ctx.createRadialGradient(940, 96, 0, 940, 96, 220);
glow2.addColorStop(0, 'rgba(203,184,157,0.10)');
glow2.addColorStop(1, 'rgba(203,184,157,0)');
ctx.fillStyle = glow2;
ctx.fillRect(0, 0, width, height);

roundRect(ctx, 44, 44, 1112, 542, 34, panel, line);

ctx.fillStyle = primary;
ctx.font = '500 22px "DejaVu Sans"';
ctx.fillText('FEASIBILITY INTELLIGENCE', 94, 112);

ctx.fillStyle = text;
ctx.font = '600 72px "DejaVu Sans"';
ctx.fillText('Screen subdivision', 94, 222);
ctx.fillText('opportunities earlier.', 94, 302);

ctx.fillStyle = muted;
ctx.font = '28px "DejaVu Sans"';
ctx.fillText('First-pass feasibility with clear constraints, yield, confidence, and next steps.', 94, 372);

roundRect(ctx, 94, 452, 310, 72, 22, '#0B1016', 'rgba(255,255,255,0.06)');
ctx.fillStyle = primary;
ctx.font = '600 18px "DejaVu Sans"';
ctx.fillText('PASS / FAIL / REVIEW', 122, 496);

roundRect(ctx, 430, 452, 230, 72, 22, '#0B1016', 'rgba(255,255,255,0.06)');
ctx.fillStyle = text;
ctx.font = '600 18px "DejaVu Sans"';
ctx.fillText('Estimated yield', 458, 496);

roundRect(ctx, 686, 452, 204, 72, 22, '#0B1016', 'rgba(255,255,255,0.06)');
ctx.fillStyle = text;
ctx.font = '600 18px "DejaVu Sans"';
ctx.fillText('Confidence', 714, 496);

ctx.strokeStyle = 'rgba(123,164,255,0.30)';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(932, 170);
ctx.lineTo(1092, 170);
ctx.stroke();

ctx.strokeStyle = 'rgba(123,164,255,0.18)';
ctx.beginPath();
ctx.moveTo(932, 218);
ctx.lineTo(1092, 218);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(932, 266);
ctx.lineTo(1092, 266);
ctx.stroke();

ctx.fillStyle = accent;
ctx.font = '500 18px "DejaVu Sans"';
ctx.fillText('Decision-grade first-pass screening.', 932, 340);

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
