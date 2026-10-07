# Production Security Checklist

## Authentication
- [ ] Server-side admin authentication
- [ ] Argon2id/bcrypt password hashing
- [ ] MFA for administrators
- [ ] HttpOnly/Secure/SameSite session cookies
- [ ] Server-side role/permission checks
- [ ] Session rotation and expiration

## Input / API
- [ ] Server-side schema validation
- [ ] Parameterized database queries
- [ ] Output encoding
- [ ] File/image URL allowlists
- [ ] Request body and field-size limits
- [ ] CSRF protection where applicable

## Abuse resistance
- [ ] Per-IP + per-account rate limiting
- [ ] Bot/WAF rules
- [ ] Request timeouts
- [ ] Payload size limits
- [ ] CDN/DDoS protection
- [ ] Structured security/audit logs

## Browser security
- [ ] HTTPS everywhere
- [ ] HSTS
- [ ] Content-Security-Policy
- [ ] frame-ancestors / X-Frame-Options
- [ ] Referrer-Policy
- [ ] Permissions-Policy
- [ ] Secure external links

## QA
- [ ] Dependency audit
- [ ] SAST
- [ ] DAST
- [ ] Authentication/authorization tests
- [ ] XSS/CSRF/SSRF/SQLi tests against the API
- [ ] Backup and restore test
