import { getIntakeDb, DatabaseInstance } from '../client.js';
import { admissionsApplications, admissionsStatusHistory, notificationOutbox } from '../schema.js';

export interface CreateApplicationInput {
  fullName: string;
  email: string;
  phone: string;
  courseCode: string;
  formResponses?: Record<string, unknown>;
  idempotencyKey: string;
  ipHash?: string;
}

/**
 * Academy admissions application submission.
 * Atomically writes to admissions_applications, admissions_status_history,
 * and enqueues applicant confirmation notification in notification_outbox.
 * Generates UUIDs in Node.js before insertion to execute pure INSERT without RETURNING id.
 */
export async function submitAdmissionsApplication(
  input: CreateApplicationInput,
  dbClient?: DatabaseInstance
): Promise<{ id: string }> {
  const db = dbClient || getIntakeDb();
  const applicationId = crypto.randomUUID();
  const historyId = crypto.randomUUID();
  const notificationId = crypto.randomUUID();

  await db.transaction(async (tx) => {
    // 1. Insert application
    await tx.insert(admissionsApplications).values({
      id: applicationId,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      courseCode: input.courseCode,
      formResponses: input.formResponses || {},
      status: 'submitted',
      idempotencyKey: input.idempotencyKey,
      ipHash: input.ipHash,
    });

    // 2. Insert initial status history audit record
    await tx.insert(admissionsStatusHistory).values({
      id: historyId,
      applicationId,
      fromStatus: null,
      toStatus: 'submitted',
      changedBy: null,
      note: 'Initial web application submission',
    });

    // 3. Enqueue minimal confirmation email notification
    await tx.insert(notificationOutbox).values({
      id: notificationId,
      channel: 'applicant_email',
      recipient: input.email,
      payload: {
        applicationId,
        applicantName: input.fullName,
        courseCode: input.courseCode,
      },
      applicationId,
    });
  });

  return { id: applicationId };
}
