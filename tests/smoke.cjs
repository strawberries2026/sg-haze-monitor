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
assert.match(html, /function isDatedPsiForecastForTomorrow\(\)/, 'Next-day planner must verify forecast date is tomorrow');
assert.match(html, /if\(isDatedPsiForecastForTomorrow\(\)\)/, 'Planner must not apply a same-day forecast to tomorrow');
assert.match(html, /function isDatedPsiForecastCurrent\(\)/, 'Gauge must check current Singapore forecast date');
assert.match(html, /id="datedForecastGaugeValue"/, 'Dated forecast gauge must exist');
assert.match(html, /background push alerts require a separate notification service/, 'Alert limitations must be disclosed');
assert.match(html, /not a PSI forecast/i, 'Weather must be distinguished from PSI forecast');
assert.match(html, /tile\.openstreetmap\.org/, 'Map should use direct OSM tiles');
assert.doesNotMatch(html, /openstreetmap\.org\/export\/embed\.html/, 'Embedded OSM map must not return');
assert.match(html, /openstreetmap\.org\/copyright/, 'Visible OSM attribution must link to copyright');
for (const region of ['north','south','east','west','central']) {
  assert.match(html, new RegExp('data-region="'+region+'"'), 'Missing map region: '+region);
}
assert.match(html, /const pins=\{north:\[103\.82,1\.414\]/, 'Singapore regional coordinates should be present');
assert.match(html, /function draw\(\)/, 'Responsive map projection should be present');
console.log('PASS: inline JavaScript syntax, haze safety checks, map attribution and regional positions');
