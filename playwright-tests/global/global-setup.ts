import { expect } from "@playwright/test";
import { exec, execSync, spawn } from "child_process";
import { promisify } from "util";
import path from "path";
import http from "http";
import * as dotenv from "dotenv";
import axios from "axios";
import { query } from "./db-utils";
import { UserEntity } from "api/src/libs/db/entities/user.entity";
import {
  ADMIN_ENTITY,
  SUPERVISOR_ENTITY,
  USER_ENTITY,
} from "../mocks/user.mocks";

const execAsync = promisify(exec);

async function globalSetup(): Promise<void> {
  console.log("Starting test database containers...");

  dotenv.config({
    path: path.resolve(process.cwd(), "playwright-tests/global/.env.test"),
  });

  process.env.DB_HOST = process.env.DB_HOST || "localhost";
  process.env.DB_PORT = process.env.DB_PORT || "5433";
  process.env.DB_USER = process.env.DB_USER || "magnum_test";
  process.env.DB_PASSWORD = process.env.DB_PASSWORD || "mysecretpassword123";
  process.env.DB_NAME = process.env.DB_NAME || "magnumdb_test";

  try {
    // Path to test docker-compose file
    const composeFilePath = path.join(__dirname, "docker-compose.test.yml");

    // Spin up the test database containers
    execSync(`docker compose -f "${composeFilePath}" up -d`);

    // Wait for the database to be ready (adjust the time as needed)
    console.log("Waiting for database to be ready...");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // You can add database migration or seeding here if needed
    await execAsync("npm run migration:run", {
      cwd: path.resolve(__dirname, "../../api"),
    });

    console.log("Migration finished, checking tables...");

    const result = await query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    );
    console.log("Tables:", result.rows);

    console.log("Test database is ready!");
  } catch (error) {
    console.error("Failed to start test database:", error);
    throw error;
  }

  // Start the API in test mode
  console.log("Starting APP in test mode...");

  // Build API & Web
  await execAsync("npm run build", {
    cwd: path.resolve(__dirname, "../../api"),
  });
  await execAsync("npm run build", {
    cwd: path.resolve(__dirname, "../../web"),
  });

  // Start API
  const apiProcess = spawn("npm", ["run", "start"], {
    cwd: path.resolve(__dirname, "../../api"),
    env: { ...process.env, NODE_ENV: "test" },
    detached: true,
    stdio: "ignore",
    shell: true,
  });

  global.__API_PROCESS__ = apiProcess;

  // Start Web (Serving built frontend)
  const webProcess = spawn("npm", ["run", "start:re-optimize"], {
    cwd: path.resolve(__dirname, "../../web"),
    env: { ...process.env, NODE_ENV: "test" },
    detached: true,
    stdio: "ignore",
    shell: true,
  });

  global.__WEB_PROCESS__ = webProcess;

  console.log("Waiting for APP to start...");
  await new Promise((res) => setTimeout(res, 10000));

  const users = [ADMIN_ENTITY, SUPERVISOR_ENTITY, USER_ENTITY];
  const tokens: AuthTokens[] = [];
  for (const user of users) {
    const response = await insertUsers(user);
    tokens.push(response);
  }

  console.log("Test environment is ready!");
}

interface AuthTokens {
  user: string;
  refreshToken: string;
  accessToken: string;
}
async function insertUsers(user: UserEntity): Promise<AuthTokens> {
  const apiKey = "hf9dnpc362873rruifbz3r8f";
  const endpointBaseUrl = "http://127.0.0.1:8080/api/auth/users";

  const dbResult1 = await query<{ email: string }>(
    'SELECT * FROM "user" WHERE "email" = $1',
    [user.email]
  );
  const postFix = dbResult1.rowCount > 0 ? "login" : "sign-up";
  const endpointUrl = `${endpointBaseUrl}/${postFix}`;
  try {
    const response = await axios.post(
      endpointUrl,
      {
        email: user.email,
        password: user.password,
        status: user.status,
        role: user.role,
        name: user.name,
        surname: user.surname,
        managerId: user.managerId,
      },
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const responseBody = response.data;
    expect(responseBody).toHaveProperty("accessToken");
    expect(responseBody).toHaveProperty("refreshToken");

    return {
      user: user.email,
      refreshToken: responseBody.refreshToken,
      accessToken: responseBody.accessToken,
    };
  } catch (error: any) {
    console.error(`Error processing user ${user.email} in startup`);
    throw error;
  }
}

export default globalSetup;
