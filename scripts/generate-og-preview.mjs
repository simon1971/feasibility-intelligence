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
const line = 'rgba(255,255,255,0.10)';
const success = '#8BD0AA';
const warning = '#E7C07D';
const danger = '#F08B8B';

ctx.fillStyle = bg;
ctx.fillRect(0, 0, width, height);

const glow1 = ctx.createRadialGradient(220, 90, 0, 220, 90, 240);
glow1.addColorStop(0, 'rgba(123,164,255,0.24)');
glow1.addColorStop(1, 'rgba(123,164,255,0)');
ctx.fillStyle = glow1;
ctx.fillRect(0, 0, width, height);

const glow2 = ctx.createRadialGradient(980, 100, 0, 980, 100, 180);
glow2.addColorStop(0, 'rgba(203,184,157,0.18)');
glow2.addColorStop(1, 'rgba(203,184,157,0)');
ctx.fillStyle = glow2;
ctx.fillRect(0, 0, width, height);

roundRect(ctx, 44, 44, 1112, 542, 32, panel, line);

ctx.fillStyle = primary;
ctx.font = '500 22px "DejaVu Sans"';
ctx.fillText('FEASIBILITY INTELLIGENCE', 86, 112);

ctx.fillStyle = text;
ctx.font = '600 58px "DejaVu Sans"';
ctx.fillText('Filter non-starters early.', 86, 192);
ctx.fillText('Explain why. Escalate the right work.', 86, 256);

ctx.fillStyle = muted;
ctx.font = '28px "DejaVu Sans"';
ctx.fillText('A first-pass feasibility engine for faster decisions and cleaner expert allocation.', 86, 320);

const colY = 382;
const colH = 150;
const leftX = 86;
const midX = 430;
const rightX = 826;

card(ctx, leftX, colY, 252, colH, 'Inputs', 'Zoning · Site metrics · Constraints · Market', primary);
card(ctx, midX, colY - 16, 308, 182, 'Processing layers', 'Normalise · Check constraints · Classify', primary);
card(ctx, rightX, colY, 282, colH, 'Outputs', 'Not feasible · Needs review · High potential', accent);

connector(ctx, leftX + 252, colY + 74, midX);
connector(ctx, midX + 308, colY + 58, rightX);

for (const [i, label] of ['Signal ingest', 'Rule pass', 'Decision layer'].entries()) {
  layerNode(ctx, midX + 34, colY + 20 + i * 48, label, i + 1);
}

outputPill(ctx, rightX + 26, colY + 28, 'Not feasible', danger);
outputPill(ctx, rightX + 26, colY + 68, 'Needs review', warning);
outputPill(ctx, rightX + 26, colY + 108, 'High potential', success);

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

function card(ctx, x, y, w, h, title, body, accentColor) {
  roundRect(ctx, x, y, w, h, 24, '#0B1016', 'rgba(255,255,255,0.08)');
  ctx.fillStyle = accentColor;
  ctx.font = '500 18px "DejaVu Sans"';
  ctx.fillText(title, x + 22, y + 36);
  ctx.fillStyle = muted;
  ctx.font = '20px "DejaVu Sans"';
  wrapText(ctx, body, x + 22, y + 76, w - 44, 28);
}

function connector(ctx, x1, y, x2) {
  ctx.strokeStyle = 'rgba(123,164,255,0.65)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x1 + 12, y);
  ctx.lineTo(x2 - 16, y);
  ctx.stroke();
  ctx.fillStyle = primary;
  ctx.beginPath();
  ctx.arc((x1 + x2) / 2, y, 7, 0, Math.PI * 2);
  ctx.fill();
}

function layerNode(ctx, x, y, label, idx) {
  roundRect(ctx, x, y, 236, 34, 17, 'rgba(123,164,255,0.08)', 'rgba(123,164,255,0.22)');
  ctx.fillStyle = primary;
  ctx.font = '600 15px "DejaVu Sans"';
  ctx.fillText(`0${idx}`, x + 14, y + 22);
  ctx.fillStyle = text;
  ctx.font = '500 15px "DejaVu Sans"';
  ctx.fillText(label, x + 52, y + 22);
}

function outputPill(ctx, x, y, label, color) {
  roundRect(ctx, x, y, 208, 28, 14, 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.06)');
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + 14, y + 14, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = text;
  ctx.font = '500 14px "DejaVu Sans"';
  ctx.fillText(label, x + 28, y + 19);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}
