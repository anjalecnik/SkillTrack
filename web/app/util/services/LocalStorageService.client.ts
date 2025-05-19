import { t } from "i18next";

const STORAGE = window.localStorage;

const toString = (value: unknown): string => {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
};

const tryParse = <T>(value: string): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    throw new Error(t("error.failedToParseValue") as string);
  }
};

export const LocalStorageService = {
  set<T>(key: string, value: T) {
    STORAGE.setItem(key, toString(value));
  },

  get<T>(key: string): T | null {
    const value = STORAGE.getItem(key);
    return value ? tryParse<T>(value) : null;
  },

  getString(key: string): string | null {
    return STORAGE.getItem(key);
  },

  remove(key: string) {
    STORAGE.removeItem(key);
  },
};
