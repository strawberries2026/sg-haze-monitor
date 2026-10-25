# SG Haze Monitor — v1.0.0 release candidate

Status: **Prepared, not yet tagged or published.**

## Scope
- SG Haze Monitor personal-project branding and original-work copyright notices.
- Singapore regional haze dashboard with 24-hour PSI and 1-hour PM2.5 readings, weather outlook, historical trends, charts and mobile map.
- Alert configuration, data freshness indicators and Android home-screen web app support.
- `COPYRIGHT.md`, `SECURITY.md` and project ownership documentation.

## Release gate
- GitHub Actions `smoke` check passes on the review pull request.
- Confirm GitHub's branch ruleset requires `smoke` and prevents untested merges.
- Review deployment and live NEA data manually on Android; automated smoke tests do not verify external live data or Android installation.
- After successful checks and review, merge via squash and create GitHub Release with tag `v1.0.0` targeting the verified `main` commit.

This file is a release preparation record, not a claim that GitHub Release `v1.0.0` already exists.
