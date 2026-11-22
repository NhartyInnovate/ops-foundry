export interface CorporateEmailPayload {
  inquiryId: string;
  formType: 'contact' | 'pilot';
  template: 'corporate_contact_enquiry' | 'corporate_pilot_enquiry';
  fullName: string;
  email: string;
  organization: string;
  phone?: string | null;
  website?: string | null;
  serviceInterest?: string | null;
  message?: string | null;
  preferredStartTiming?: string | null;
  submittedAt: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(str: string | null | undefined): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatServiceLabel(val: string | null | undefined): string {
  switch (val) {
    case 'get-online':
      return 'Get Online (Digital Presence & Websites)';
    case 'get-visible':
      return 'Get Visible (Content & Communications)';
    case 'get-customers':
      return 'Get Customers (Prospecting & Pipeline)';
    case 'not-sure':
      return 'Not Sure (Needs Scoping Guidance)';
    default:
      return val || 'All Operational Services';
  }
}

/**
 * Professional Notification Template for General Contact Enquiries.
 */
export function renderContactEnquiryEmail(payload: CorporateEmailPayload): RenderedEmail {
  const subject = `[Ops Foundry Contact] ${payload.organization} — ${payload.fullName}`;

  const text = [
    `=== NEW OPS FOUNDRY CONTACT ENQUIRY ===`,
    ``,
    `Full Name:     ${payload.fullName}`,
    `Work Email:    ${payload.email}`,
    `Organization:  ${payload.organization}`,
    payload.phone ? `Phone:         ${payload.phone}` : null,
    `Submitted At:  ${payload.submittedAt}`,
    `Reference ID:  ${payload.inquiryId}`,
    ``,
    `--- MESSAGE ---`,
    payload.message || '(No message provided)',
    ``,
    `----------------------------------------------------`,
    `Ops Foundry Automated Operational Notifications`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0b0f24;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f4f6f8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #0b0f24; padding: 24px 32px; border-bottom: 3px solid #ff4b4b;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Ops Foundry</span>
                    <span style="display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 2px;">Operational Infrastructure</span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #1e293b; color: #38bdf8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; rounded-full: 9999px; border-radius: 9999px;">
                      Contact Enquiry
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="font-size: 18px; font-weight: 700; color: #0b0f24; margin: 0 0 8px 0;">New Contact Enquiry Received</h1>
              <p style="font-size: 14px; color: #475569; margin: 0 0 24px 0; line-height: 1.5;">A visitor has submitted a new general enquiry through the Ops Foundry corporate website.</p>

              <!-- Sender Metadata Grid -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b; width: 140px;">Full Name</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0b0f24;">${escapeHtml(payload.fullName)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Work Email</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0b0f24;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${escapeHtml(payload.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Organization</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0b0f24;">${escapeHtml(payload.organization)}</td>
                </tr>
                ${payload.phone ? `
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Phone</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0b0f24;">${escapeHtml(payload.phone)}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Submitted At</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b;">${escapeHtml(payload.submittedAt)}</td>
                </tr>
              </table>

              <!-- Message Block -->
              <div style="margin-bottom: 28px;">
                <h2 style="font-size: 14px; font-weight: 700; color: #0b0f24; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">Message Content</h2>
                <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #0b0f24; border-radius: 4px; padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
${escapeHtml(payload.message || '(No message content provided)')}
                </div>
              </div>

              <!-- Quick Action Button -->
              <div style="text-align: center; margin: 32px 0 16px 0;">
                <a href="mailto:${escapeHtml(payload.email)}?subject=Re:%20Ops%20Foundry%20Enquiry%20-%20${encodeURIComponent(payload.organization)}" style="display: inline-block; background-color: #0b0f24; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 6px;">
                  Reply directly to ${escapeHtml(payload.fullName)}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer Bar -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              <span>Ops Foundry Automated Delivery &bull; Reference ID: <code style="font-family: monospace; color: #64748b;">${escapeHtml(payload.inquiryId)}</code></span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

/**
 * Professional Notification Template for Operational Pilot Requests.
 */
export function renderPilotEnquiryEmail(payload: CorporateEmailPayload): RenderedEmail {
  const serviceLabel = formatServiceLabel(payload.serviceInterest);
  const subject = `[Ops Foundry Pilot] ${payload.organization} — ${payload.fullName} (${serviceLabel})`;

  const text = [
    `=== NEW OPS FOUNDRY OPERATIONAL PILOT REQUEST ===`,
    ``,
    `Full Name:         ${payload.fullName}`,
    `Work Email:        ${payload.email}`,
    `Organization:      ${payload.organization}`,
    payload.website ? `Website:           ${payload.website}` : null,
    `Service Interest:  ${serviceLabel}`,
    payload.preferredStartTiming ? `Preferred Timing:  ${payload.preferredStartTiming}` : null,
    `Submitted At:      ${payload.submittedAt}`,
    `Reference ID:      ${payload.inquiryId}`,
    ``,
    `--- OPERATIONAL CHALLENGE / PROBLEM STATEMENT ---`,
    payload.message || '(No details provided)',
    ``,
    `----------------------------------------------------`,
    `Ops Foundry Automated Operational Notifications`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0b0f24;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f4f6f8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #0b0f24; padding: 24px 32px; border-bottom: 3px solid #ff4b4b;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Ops Foundry</span>
                    <span style="display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 2px;">Operational Pilot Scoping</span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #1e293b; color: #34d399; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 9999px;">
                      Pilot Request
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="font-size: 18px; font-weight: 700; color: #0b0f24; margin: 0 0 8px 0;">New Pilot Scoping Consultation Request</h1>
              <p style="font-size: 14px; color: #475569; margin: 0 0 24px 0; line-height: 1.5;">A prospective client has requested an exploratory consultation for a structured operational pilot.</p>

              <!-- Key Inquiry Fields Table -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b; width: 140px;">Full Name</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0b0f24;">${escapeHtml(payload.fullName)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Work Email</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0b0f24;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${escapeHtml(payload.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Organization</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0b0f24;">${escapeHtml(payload.organization)}</td>
                </tr>
                ${payload.website ? `
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Website</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0b0f24;"><a href="${escapeHtml(payload.website)}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: none;">${escapeHtml(payload.website)}</a></td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Service Interest</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; color: #0b0f24;">${escapeHtml(serviceLabel)}</td>
                </tr>
                ${payload.preferredStartTiming ? `
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #64748b;">Preferred Timing</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0b0f24;">${escapeHtml(payload.preferredStartTiming)}</td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Submitted At</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #64748b;">${escapeHtml(payload.submittedAt)}</td>
                </tr>
              </table>

              <!-- Challenge / Business Problem Details -->
              <div style="margin-bottom: 28px;">
                <h2 style="font-size: 14px; font-weight: 700; color: #0b0f24; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">What Needs Attention / Business Problem</h2>
                <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #ff4b4b; border-radius: 4px; padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
${escapeHtml(payload.message || '(No challenge description provided)')}
                </div>
              </div>

              <!-- Quick Action Button -->
              <div style="text-align: center; margin: 32px 0 16px 0;">
                <a href="mailto:${escapeHtml(payload.email)}?subject=Ops%20Foundry%20Pilot%20Scoping%20-%20${encodeURIComponent(payload.organization)}" style="display: inline-block; background-color: #0b0f24; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 6px;">
                  Schedule scoping session with ${escapeHtml(payload.fullName)}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer Bar -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              <span>Ops Foundry Automated Delivery &bull; Reference ID: <code style="font-family: monospace; color: #64748b;">${escapeHtml(payload.inquiryId)}</code></span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
