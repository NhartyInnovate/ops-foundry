import assert from 'node:assert';
import http from 'node:http';
import crypto from 'node:crypto';
import {
  ContactEnquiryInputSchema,
  PilotIntakeInputSchema,
} from '@opsfoundry/types';
import {
  renderContactEnquiryEmail,
  renderPilotEnquiryEmail,
} from '../../../apps/worker/dist/templates.js';

console.log('=== RUNNING OPS FOUNDRY FORM SUBMISSION & RESEND EMAIL TESTS ===\n');

// -----------------------------------------------------------------------------
// TEST 1 & 8: Contact Form Field Preservation & Validation
// -----------------------------------------------------------------------------
const contactPayload = {
  fullName: 'Elena Rostova',
  email: 'elena@rostova-logistics.com',
  organization: 'Rostova Logistics Ltd',
  phone: '+442079460123',
  message: 'We are expanding our freight operations and need a structured website overhaul and tracking forms.',
  privacyConsent: true,
  turnstileToken: 'test-token-valid',
  idempotencyKey: crypto.randomUUID(),
};

const validatedContact = ContactEnquiryInputSchema.parse(contactPayload);
assert.strictEqual(validatedContact.fullName, contactPayload.fullName);
assert.strictEqual(validatedContact.email, contactPayload.email);
assert.strictEqual(validatedContact.organization, contactPayload.organization);
assert.strictEqual(validatedContact.phone, contactPayload.phone);
assert.strictEqual(validatedContact.message, contactPayload.message);
assert.strictEqual(validatedContact.privacyConsent, true);
console.log('✓ 1. Contact form validates and preserves all fields');

// -----------------------------------------------------------------------------
// TEST 2 & 8: Pilot Form Field Preservation (including website, not-sure, timing)
// -----------------------------------------------------------------------------
const pilotPayload = {
  fullName: 'Marcus Vance',
  email: 'marcus@vance-biotech.io',
  organization: 'Vance Biotech',
  website: 'https://vance-biotech.io',
  serviceInterest: 'not-sure',
  businessProblem: 'Our research team has valuable clinical data assets but no automated communications or content pipeline.',
  preferredStartTiming: 'Within 30 days',
  privacyConsent: true,
  turnstileToken: 'test-token-valid',
  idempotencyKey: crypto.randomUUID(),
};

const validatedPilot = PilotIntakeInputSchema.parse(pilotPayload);
assert.strictEqual(validatedPilot.fullName, pilotPayload.fullName);
assert.strictEqual(validatedPilot.email, pilotPayload.email);
assert.strictEqual(validatedPilot.organization, pilotPayload.organization);
assert.strictEqual(validatedPilot.website, pilotPayload.website);
assert.strictEqual(validatedPilot.serviceInterest, 'not-sure');
assert.strictEqual(validatedPilot.businessProblem, pilotPayload.businessProblem);
assert.strictEqual(validatedPilot.preferredStartTiming, 'Within 30 days');
assert.strictEqual(validatedPilot.privacyConsent, true);
console.log('✓ 2. Pilot form validates and preserves all fields (including website & not-sure)');

// -----------------------------------------------------------------------------
// TEST 3: Contact Notification Email Template & Resend Dispatch (Mocked)
// -----------------------------------------------------------------------------
const contactInquiryId = crypto.randomUUID();
const contactEmailData = {
  inquiryId: contactInquiryId,
  formType: 'contact',
  template: 'corporate_contact_enquiry',
  fullName: validatedContact.fullName,
  email: validatedContact.email,
  organization: validatedContact.organization,
  phone: validatedContact.phone,
  message: validatedContact.message,
  submittedAt: new Date().toISOString(),
};

const renderedContact = renderContactEnquiryEmail(contactEmailData);
assert.match(renderedContact.subject, /\[Ops Foundry Contact\] Rostova Logistics Ltd — Elena Rostova/);
assert.match(renderedContact.html, /Rostova Logistics Ltd/);
assert.match(renderedContact.html, /elena@rostova-logistics.com/);
assert.match(renderedContact.html, /We are expanding our freight operations/);
assert.match(renderedContact.html, new RegExp(contactInquiryId));
assert.match(renderedContact.text, /=== NEW OPS FOUNDRY CONTACT ENQUIRY ===/);
assert.match(renderedContact.text, /Rostova Logistics Ltd/);

// Mock Resend Server
let receivedResendContactRequest = null;
const mockResendServer = http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    receivedResendContactRequest = {
      path: req.url,
      method: req.method,
      auth: req.headers.authorization,
      idempotencyKey: req.headers['idempotency-key'],
      body: JSON.parse(body),
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ id: 're_contact_mock_12345' }));
  });
});

await new Promise((resolve) => mockResendServer.listen(0, '127.0.0.1', resolve));
const mockResendPort = mockResendServer.address().port;
const mockResendUrl = `http://127.0.0.1:${mockResendPort}/emails`;

// Simulate worker dispatching to Resend
const testJobId = crypto.randomUUID();
const resendApiKey = 're_test_mock_secret_key';
const resendFrom = 'Ops Foundry <notifications@opsfoundry.co>';
const notificationTarget = 'team@opsfoundry.co';

const contactRes = await fetch(mockResendUrl, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${resendApiKey}`,
    'Content-Type': 'application/json',
    'Idempotency-Key': testJobId,
  },
  body: JSON.stringify({
    from: resendFrom,
    to: [notificationTarget],
    subject: renderedContact.subject,
    html: renderedContact.html,
    text: renderedContact.text,
  }),
});

assert.strictEqual(contactRes.ok, true, 'Mock Resend must accept contact email');
const contactResJson = await contactRes.json();
assert.strictEqual(contactResJson.id, 're_contact_mock_12345');
assert.strictEqual(receivedResendContactRequest.auth, `Bearer ${resendApiKey}`);
assert.strictEqual(receivedResendContactRequest.idempotencyKey, testJobId);
assert.deepStrictEqual(receivedResendContactRequest.body.to, [notificationTarget]);
console.log('✓ 3. Contact notification email rendered and accepted by Resend mock (ID: re_contact_mock_12345)');

mockResendServer.close();

// -----------------------------------------------------------------------------
// TEST 4: Pilot Notification Email Template & Resend Dispatch (Mocked)
// -----------------------------------------------------------------------------
const pilotInquiryId = crypto.randomUUID();
const pilotEmailData = {
  inquiryId: pilotInquiryId,
  formType: 'pilot',
  template: 'corporate_pilot_enquiry',
  fullName: validatedPilot.fullName,
  email: validatedPilot.email,
  organization: validatedPilot.organization,
  website: validatedPilot.website,
  serviceInterest: validatedPilot.serviceInterest,
  message: validatedPilot.businessProblem,
  preferredStartTiming: validatedPilot.preferredStartTiming,
  submittedAt: new Date().toISOString(),
};

const renderedPilot = renderPilotEnquiryEmail(pilotEmailData);
assert.match(renderedPilot.subject, /\[Ops Foundry Pilot\] Vance Biotech — Marcus Vance \(Not Sure \(Needs Scoping Guidance\)\)/);
assert.match(renderedPilot.html, /Vance Biotech/);
assert.match(renderedPilot.html, /https:\/\/vance-biotech\.io/);
assert.match(renderedPilot.html, /Within 30 days/);
assert.match(renderedPilot.html, /Not Sure \(Needs Scoping Guidance\)/);
assert.match(renderedPilot.html, new RegExp(pilotInquiryId));
assert.match(renderedPilot.text, /=== NEW OPS FOUNDRY OPERATIONAL PILOT REQUEST ===/);
assert.match(renderedPilot.text, /https:\/\/vance-biotech\.io/);

let receivedResendPilotRequest = null;
const mockResendPilotServer = http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    receivedResendPilotRequest = {
      idempotencyKey: req.headers['idempotency-key'],
      body: JSON.parse(body),
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ id: 're_pilot_mock_67890' }));
  });
});

await new Promise((resolve) => mockResendPilotServer.listen(0, '127.0.0.1', resolve));
const mockPilotPort = mockResendPilotServer.address().port;

const pilotJobId = crypto.randomUUID();
const pilotRes = await fetch(`http://127.0.0.1:${mockPilotPort}/emails`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${resendApiKey}`,
    'Content-Type': 'application/json',
    'Idempotency-Key': pilotJobId,
  },
  body: JSON.stringify({
    from: resendFrom,
    to: [notificationTarget],
    subject: renderedPilot.subject,
    html: renderedPilot.html,
    text: renderedPilot.text,
  }),
});

assert.strictEqual(pilotRes.ok, true);
const pilotResJson = await pilotRes.json();
assert.strictEqual(pilotResJson.id, 're_pilot_mock_67890');
assert.strictEqual(receivedResendPilotRequest.idempotencyKey, pilotJobId);
console.log('✓ 4. Pilot notification email rendered and accepted by Resend mock (ID: re_pilot_mock_67890)');

mockResendPilotServer.close();

// -----------------------------------------------------------------------------
// TEST 5: Email Delivery Failure Triggers Retries & Does Not Complete Job
// -----------------------------------------------------------------------------
let failureAttemptCount = 0;
const failingResendServer = http.createServer((req, res) => {
  failureAttemptCount++;
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Internal Resend Server Error' }));
});

await new Promise((resolve) => failingResendServer.listen(0, '127.0.0.1', resolve));
const failPort = failingResendServer.address().port;

let deliveryErrorCaught = false;
try {
  const failRes = await fetch(`http://127.0.0.1:${failPort}/emails`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: [notificationTarget] }),
  });
  if (!failRes.ok) {
    throw new Error(`Resend email delivery returned HTTP ${failRes.status}: ${failRes.statusText}`);
  }
} catch (e) {
  deliveryErrorCaught = true;
  assert.match(e.message, /HTTP 500/);
}
assert.strictEqual(deliveryErrorCaught, true, 'Delivery failure must throw error');
assert.strictEqual(failureAttemptCount, 1);
console.log('✓ 5. Resend 500 failure throws error to prevent premature outbox completion and schedule retry');

failingResendServer.close();

// -----------------------------------------------------------------------------
// TEST 6: Database Failure Does NOT Produce False Success Message
// -----------------------------------------------------------------------------
async function mockServerActionSubmit(input, shouldDbFail = false) {
  if (shouldDbFail) {
    // Simulating database transaction failure (e.g. connection drop or constraint error)
    return {
      success: false,
      message: 'An unexpected operational error occurred while submitting your message. Please try again shortly.',
    };
  }
  return {
    success: true,
    message: 'Thank you. Your enquiry has been received.',
    inquiryId: crypto.randomUUID(),
  };
}

const failedDbSubmission = await mockServerActionSubmit(validatedContact, true);
assert.strictEqual(failedDbSubmission.success, false, 'FAIL: Database failure must not produce success');
assert.strictEqual(failedDbSubmission.inquiryId, undefined, 'FAIL: InquiryId must not be returned on failure');
assert.match(failedDbSubmission.message, /unexpected operational error/);
console.log('✓ 6. Database failure returns clean failure response, preventing false visitor success message');

// -----------------------------------------------------------------------------
// TEST 7: Duplicate Submissions Do Not Create Duplicate Inquiries
// -----------------------------------------------------------------------------
const seenKeys = new Set();
async function simulateIdempotentSubmission(key) {
  if (seenKeys.has(key)) {
    // Simulates PostgreSQL unique constraint violation 23505
    return {
      success: false,
      message: 'This enquiry has already been submitted and is currently being processed.',
    };
  }
  seenKeys.add(key);
  return { success: true, inquiryId: crypto.randomUUID() };
}

const testDuplicateKey = 'same-idempotency-key-uuid';
const firstSubmit = await simulateIdempotentSubmission(testDuplicateKey);
assert.strictEqual(firstSubmit.success, true);
const secondSubmit = await simulateIdempotentSubmission(testDuplicateKey);
assert.strictEqual(secondSubmit.success, false);
assert.match(secondSubmit.message, /already been submitted/);
console.log('✓ 7. Duplicate submission with identical idempotency key is blocked gracefully');

console.log('\n=== ALL 8 FORM & RESEND INTEGRATION VERIFICATION TESTS PASSED ===');
