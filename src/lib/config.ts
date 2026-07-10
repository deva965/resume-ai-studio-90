// Configurable API URLs via environment variables.
// Set in a .env file at project root (see .env.example).
export const config = {
  apiUrl: import.meta.env.VITE_API_URL ?? "",
  aiApiUrl: import.meta.env.VITE_AI_API_URL ?? "",
  appName: "Resumely",
};
