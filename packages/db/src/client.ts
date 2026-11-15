import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

export type DatabaseInstance = PostgresJsDatabase<typeof schema>;

const poolOptions: postgres.Options<{}> = {
  prepare: false, // Mandatory for Supabase Transaction Pooler (port 6543)
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
};

const clientCache = new Map<string, DatabaseInstance>();

function assertExpectedRoleInUrl(
  connectionString: string,
  expectedRole: string,
  envVarName: string
): void {
  let parsed: URL;
  try {
    parsed = new URL(connectionString);
  } catch {
    throw new Error(
      `[CRITICAL DATABASE ERROR] ${envVarName} is not a valid PostgreSQL connection URI.`
    );
  }
  const username = decodeURIComponent(parsed.username);
  // Support both direct PostgreSQL login ("<role>") and Supabase Supavisor pooler format ("<role>.<project-ref>")
  if (username !== expectedRole && !username.startsWith(`${expectedRole}.`)) {
    throw new Error(
      `[CRITICAL DATABASE ERROR] ${envVarName} must authenticate as "${expectedRole}" (or "${expectedRole}.<project-ref>"), but found user "${username || '<empty>'}". Refusing privileged or mismatched runtime connection.`
    );
  }
}

function getOrCreateClient(connectionString: string): DatabaseInstance {
  let client = clientCache.get(connectionString);
  if (!client) {
    const sqlClient = postgres(connectionString, poolOptions);
    client = drizzle(sqlClient, { schema });
    clientCache.set(connectionString, client);
  }
  return client;
}

/**
 * Scoped database client for Corporate application Server Actions.
 * Connects exclusively via ops_corp_runtime identity.
 */
export function getCorpDb(): DatabaseInstance {
  const url = process.env.CORP_DATABASE_URL;
  if (!url) {
    throw new Error(
      '[CRITICAL DATABASE ERROR] CORP_DATABASE_URL is not defined in environment. Corporate runtime requires dedicated scoped credentials.'
    );
  }
  assertExpectedRoleInUrl(url, 'ops_corp_runtime', 'CORP_DATABASE_URL');
  return getOrCreateClient(url);
}

/**
 * Scoped database client for Academy application Server Actions.
 * Connects exclusively via ops_intake_runtime identity.
 */
export function getIntakeDb(): DatabaseInstance {
  const url = process.env.ACADEMY_DATABASE_URL;
  if (!url) {
    throw new Error(
      '[CRITICAL DATABASE ERROR] ACADEMY_DATABASE_URL is not defined in environment. Academy intake runtime requires dedicated scoped credentials.'
    );
  }
  assertExpectedRoleInUrl(url, 'ops_intake_runtime', 'ACADEMY_DATABASE_URL');
  return getOrCreateClient(url);
}

/**
 * Scoped database client for Outbox Background Worker.
 * Connects exclusively via ops_worker_runtime identity.
 */
export function getWorkerDb(): DatabaseInstance {
  const url = process.env.WORKER_DATABASE_URL;
  if (!url) {
    throw new Error(
      '[CRITICAL DATABASE ERROR] WORKER_DATABASE_URL is not defined in environment. Worker runtime requires dedicated scoped credentials.'
    );
  }
  assertExpectedRoleInUrl(url, 'ops_worker_runtime', 'WORKER_DATABASE_URL');
  return getOrCreateClient(url);
}

/**
 * Explicit development-only privileged client.
 * Strictly forbidden in production environments.
 */
export function getLocalDevPrivilegedDb(): DatabaseInstance {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      '[SECURITY VIOLATION] getLocalDevPrivilegedDb() cannot be called in production mode.'
    );
  }
  if (process.env.ALLOW_INSECURE_DEV_SHARED_DB !== 'true') {
    throw new Error(
      '[DEVELOPER OPT-IN REQUIRED] To use the local shared database in development, set ALLOW_INSECURE_DEV_SHARED_DB=true in your local environment.'
    );
  }
  const url =
    process.env.LOCAL_DEV_DATABASE_URL ||
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/opsfoundry';
  return getOrCreateClient(url);
}
