import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import treeKill from "tree-kill";

const execAsync = promisify(exec);

async function globalTeardown(): Promise<void> {
  try {
    // Kill the API process
    if (global.__API_PROCESS__) {
      console.log("Stopping API...");
      treeKill(global.__API_PROCESS__.pid!);
    }

    // Kill Web process if running
    if (global.__WEB_PROCESS__) {
      console.log("Stopping Web...");
      treeKill(global.__WEB_PROCESS__.pid!);
    }
    console.log("APP process stopped successfully.");

    console.log("Tearing down test database containers...");
    // Stop and remove the test containers
    const composeFilePath = path.join(__dirname, "docker-compose.test.yml");
    console.log("Stopping test database container...");
    // Tear down the test database containers and remove volumes
    await execAsync(
      `docker compose -f "${composeFilePath}" down --remove-orphans -v`
    );
    await execAsync(`docker volume prune -f`);
    console.log("Removing dangling resources...");
    await execAsync(`docker system prune -f --volumes`);

    console.log("Test environment teardown complete!");
  } catch (error) {
    console.error("Error during teardown:", error);
    throw error;
  }
}

export default globalTeardown;
