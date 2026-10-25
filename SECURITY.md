# Security and repository safeguards

This public GitHub Pages website serves HTML, CSS and JavaScript to visitors; client-side code cannot be hidden from browsers. Copyright notices deter misrepresentation but cannot technically prevent copying.

Recommended GitHub account/repository settings (owner action required):

1. Enable two-factor authentication and preferably passkeys/security keys for the account.
2. Protect `main` using a branch ruleset requiring pull requests and successful `smoke` checks before merge. Consider restricting force pushes and deletions. Confirm that rulesets are enforced for this repository and account plan.
3. Review collaborators and remove unneeded access. Use least privilege.
4. Keep GitHub Actions permissions minimal and avoid storing secrets in public frontend code.
5. Preserve dated releases and off-platform backups as evidence of authorship.
6. Monitor for copied websites and use appropriate host/platform copyright complaint processes where warranted.

Do not change repository visibility or GitHub Pages deployment without checking hosting implications. Private repository visibility does not make published frontend code secret.

Security reports: open a private GitHub security advisory where available, rather than publishing sensitive details in a public issue.
