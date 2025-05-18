import { Pool, QueryResult } from "pg";

// Type definitions
interface DatabaseConfig {
  host: string;
  port: string | number;
  user: string;
  password: string;
  database: string;
}

// Create a database config from environment variables
const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "5433",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "skilltrack_db",
};

// Create a connection pool to the test database
const pool = new Pool(dbConfig);

// Helper function to execute a query
async function query<T = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  try {
    const result = await pool.query<T>(text, params);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Close pool connections
async function closePool(): Promise<void> {
  await pool.end();
}

export { query, closePool, dbConfig };
