import { test as base, request } from "@playwright/test";
import fs from "fs/promises";
import { authFiles } from "../helpers/auth-helper";

const test = base.extend({});
test.use({ storageState: authFiles.admin });

export async function extractTokenFromStorageState(
  storagePath: string
): Promise<string> {
  const storageState = JSON.parse(await fs.readFile(storagePath, "utf-8"));

  const tokenEntry = storageState.origins
    ?.flatMap((origin: any) => origin.localStorage)
    .find((item: any) => item.name === "token");

  if (!tokenEntry) {
    throw new Error(`Token not found in localStorage for: ${storagePath}`);
  }

  return tokenEntry.value;
}

export { test };
