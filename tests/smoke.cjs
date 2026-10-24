const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]).filter(s => s.trim());
assert.ok(scripts.length, 'Inline application scripts must exist');
for (const [index, source] of scripts.entries()) {
  new vm.Script(source, { filename: 'inline-script-' + (index + 1) + '.js' });
}
for (const id of ['psiChart','pmChart','psiRegion','pmRegion','activityWhen','activityGroup','activityResult','hazeAlertEnabled','hazeAlertThreshold','hazeAlertStatus','weatherOutlook']) {
  assert.match(html, new RegExp('id=["\\\']' + id + '["\\\']'), 'Missing app element: ' + id);
}
assert.match(html, /timeZone:'Asia\/Singapore'/, 'Historical dates must use Singapore timezone');
assert.match(html, /formatToParts\(new Date\(\)\)/, 'Singapore date parsing must be locale-independent');
assert.match(html, /No verified next-day PSI forecast/, 'Planner must not invent forecast');
assert.match(html, /background push alerts require a separate notification service/, 'Alert limitations must be disclosed');
assert.match(html, /not a PSI forecast/i, 'Weather must be distinguished from PSI forecast');
console.log('PASS: inline JavaScript syntax and haze feature safety checks');

for(const id of ['psiTrendInsight','pmTrendInsight']) assert.ok(html.includes('id="'+id+'"'), 'Missing trend insight '+id);
assert.match(html, /AbortSignal\.timeout\(12000\)/, 'Network requests must have timeouts');
assert.match(html, /rel="manifest"/, 'PWA manifest must be linked');
assert.match(html, /\.v47-c\{left:50%;top:54%\}/, 'Central marker must align with north');
assert.match(html, /\.v47-s\{left:50%;top:69%\}/, 'South marker must align with north');
const manifest=JSON.parse(fs.readFileSync('manifest.webmanifest','utf8'));
assert.equal(manifest.display,'standalone');
assert.ok(fs.existsSync('icon.svg'));
console.log('PASS: PWA assets, marker alignment, trend insights and network timeouts');
