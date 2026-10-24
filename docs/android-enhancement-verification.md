# Android enhancement verification checklist

This branch is isolated from the published map. No production code is changed by this checklist.

## Existing behaviour (source review)
- Map: retain five regional markers and separate 1-hour PM2.5 (µg/m³) / 24-hour PSI modes.
- Trends: localStorage cache plus historical NEA API backfill. Do not interpolate missing readings.
- Planner: current PM2.5 guidance; tomorrow requires a separately verified official PSI forecast.
- Alerts: threshold checked only while the page is active; no background push notification.

## Android acceptance tests
1. Open the dashboard in Chrome on Android. Switch both map modes; check markers, zoom and map attribution.
2. Open Regional trends; choose each region and 24h, 48h and 7d. Check for loading failures, missing values, and timestamp timezone. Reload and check persisted history.
3. Select planner groups and Now/Tomorrow; verify missing-data messaging and official forecast distinction.
4. Enable PSI alert at 100/200/300, reload, and verify preference persistence. Test both below/above threshold with real readings; never fake official measurements.
5. Confirm that alerts are described as in-page only; background push requires separate permission and infrastructure.
6. Check browser console, network errors, accessibility and narrow screen overflow.

## Release gate
Do not merge until Android tests pass and any identified defects are fixed. Preserve existing map HTML/CSS/JS unless a confirmed regression requires a change.
