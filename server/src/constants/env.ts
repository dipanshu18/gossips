import "dotenv/config";

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing env variable: ${key}`);
  }

  return value;
}

export const NODE_ENV = getEnv("NODE_ENV");
export const PORT = getEnv("PORT");
export const WS_PORT = getEnv("WS_PORT");
export const APP_ORIGIN = getEnv("APP_ORIGIN", "*");
export const JWT_ACCESS_SECRET = getEnv("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const GOOGLE_CLIENT_ID = getEnv("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = getEnv("GOOGLE_CLIENT_SECRET");
export const GOOGLE_CALLBACK_URL = getEnv("GOOGLE_CALLBACK_URL");
export const REDIS_URL = getEnv("REDIS_URL");
