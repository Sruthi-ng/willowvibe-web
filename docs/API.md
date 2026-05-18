# API Documentation

## Contact Form Endpoint

**Route:** `POST /api/contact`

**File:** `src/app/api/contact/route.ts`

### Request

Content-Type: `application/json`

| Field  | Type   | Required | Validation                  |
|--------|--------|----------|-----------------------------|
| name   | string | Yes      | Must be present             |
| email  | string | Yes      | Must match basic email regex|
| phone  | string | No       | —                           |
| message| string | Yes      | Must be present             |

### Response

**Success (200):**
```json
{ "success": true }
```

**Validation Error (400):**
```json
{ "error": "Name, email and message are required." }
```
```json
{ "error": "Please provide a valid email address." }
```

**Server Error (500):**
```json
{ "error": "Failed to send message. Please email us directly at contact@willowvibe.com" }
```

### Implementation Notes

- Uses Nodemailer with Hostinger SMTP (`smtp.hostinger.com:465`).
- Requires `HOSTINGER_USER` and `HOSTINGER_PASSWORD` environment variables.
- Email is sent from and to the same Hostinger address (`HOSTINGER_USER`).
- The `replyTo` field is set to the submitter's email for easy replies.
- HTML email template is built inline in `buildHtml()` with brand styling.
