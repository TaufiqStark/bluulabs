import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" connection pool modes 
// which are commonly used in serverless environments
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
