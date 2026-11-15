import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/opsfoundry';

// Mandatory for Supabase Transaction Pooler (port 6543)
const client = postgres(connectionString, {
  prepare: false, // Transaction mode pooler does not support prepared statements
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });
