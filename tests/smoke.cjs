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

// Lightweight security regression checks for the public static website.
assert.match(html, /<meta name="referrer" content="strict-origin-when-cross-origin">/, 'Referrer policy must be present');
for (const anchor of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
  assert.match(anchor[0], /rel="[^"]*noopener/, 'External tab link missing noopener');
  assert.match(anchor[0], /rel="[^"]*noreferrer/, 'External tab link missing noreferrer');
}
assert.doesNotMatch(html, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9_]{20,}|AIza[0-9A-Za-z_-]{25,}/, 'Possible embedded credential in HTML');
assert.ok(!html.includes('eval(') && !html.includes('new Function('), 'Dynamic code execution is not permitted');
console.log('PASS: referrer policy, external links and basic frontend security checks');
