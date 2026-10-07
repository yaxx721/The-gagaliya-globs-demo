# The Gagaliya Globs — Export Dashboard

## Run
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Important deployment notes

This repository intentionally demonstrates a hardened *frontend* UX, not a complete server security boundary.

Before production:
- Replace `CONFIG.whatsapp` and `CONFIG.adminPassword` in `src/main.jsx`.
- Never store a real admin password in frontend code.
- Move catalogue CRUD to an authenticated server/API.
- Hash passwords with Argon2id or bcrypt.
- Use HttpOnly + Secure + SameSite cookies.
- Enforce authorization server-side for every CRUD operation.
- Use CSRF protection for cookie-authenticated mutations.
- Validate request bodies server-side with a schema validator.
- Use parameterized SQL queries; never concatenate SQL.
- Add API rate limits, bot controls, WAF/CDN protections and audit logs.
- Add a strict Content-Security-Policy, HSTS, `frame-ancestors`, `Referrer-Policy` and appropriate Permissions-Policy.
- Allowlist image/content hosts and consider proxying remote catalogue images.
- Configure HTTPS and redirect HTTP to HTTPS.
- Use a real secrets manager for credentials and API keys.
- Add automated unit/integration/security tests before deployment.

The UI uses React's escaping plus bounded sanitization for user-controlled strings and safe URL protocol checks. The security page's 100-cycle audit is a deterministic client-side simulation and is not a substitute for penetration testing.
