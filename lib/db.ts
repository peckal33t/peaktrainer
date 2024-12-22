import * as sdk from "node-appwrite";

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

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

const appwriteClient = new sdk.Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setKey(appwriteConfig.apiKey);

export const appwriteDatabases = new sdk.Databases(appwriteClient);
export const appwriteUsers = new sdk.Users(appwriteClient);
export const appwriteStorage = new sdk.Storage(appwriteClient);
export const appwriteMessaging = new sdk.Messaging(appwriteClient);

export { appwriteConfig };
