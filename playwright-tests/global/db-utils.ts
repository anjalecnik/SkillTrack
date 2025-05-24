import { Pool, QueryResult } from "pg";

interface DatabaseConfig {
  host: string;
  port: string | number;
  user: string;
  password: string;
  database: string;
}

const dbConfig: DatabaseConfig = {
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "postgres",
  database: "skilltrack_db",
};

// Create a connection pool to the test database
const pool = new Pool(dbConfig);

export async function query<T = any>(
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
