import fs from "fs";
import path from "path";

/**
 * Load environment variables from .env.local file into process.env
 * Used for server-side code in development where Vite doesn't auto-load them
 */
export function loadEnvFile() {
  if (typeof process === "undefined") {
    return; // Browser environment
  }

  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    return;
  }

  try {
    const content = fs.readFileSync(envPath, "utf-8");
    const lines = content.split("\n");

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const [key, ...rest] = trimmed.split("=");
      const value = rest.join("=").trim();

      if (key && value) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    console.error("Failed to load .env.local:", error);
  }
}

// Auto-load on import
loadEnvFile();
