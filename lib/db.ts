import * as sdk from "node-appwrite";

// Helper function to ensure environment variables are set
const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Appwrite Configuration
const appwriteConfig = {
  endpoint: getEnvVariable("NEXT_PUBLIC_ENDPOINT"),
  projectId: getEnvVariable("NEXT_PUBLIC_PROJECT_ID"),
  apiKey: getEnvVariable("NEXT_PUBLIC_API_KEY"),
  databaseId: getEnvVariable("NEXT_PUBLIC_DATABASE_ID"),
  clientId: getEnvVariable("NEXT_PUBLIC_CLIENT_ID"),
  trainerId: getEnvVariable("NEXT_PUBLIC_TRAINER_ID"),
  appointmentId: getEnvVariable("NEXT_PUBLIC_APPOINTMENT_ID"),
  storageBucketId: getEnvVariable("NEXT_PUBLIC_BUCKET_STORAGE"),
};

// Appwrite Client Initialization
const appwriteClient = new sdk.Client()
  .setEndpoint(appwriteConfig.endpoint) // Ensure endpoint is accessible
  .setProject(appwriteConfig.projectId) // Set project ID
  .setKey(appwriteConfig.apiKey); // Set API key

// Export Appwrite Services
export const appwriteDatabases = new sdk.Databases(appwriteClient);
export const appwriteUsers = new sdk.Users(appwriteClient);
export const appwriteStorage = new sdk.Storage(appwriteClient);
export const appwriteMessaging = new sdk.Messaging(appwriteClient);

// Optionally export the config object for debugging or external use
export { appwriteConfig };
