import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  CLIENT_ID,
  TRAINER_ID,
  APPOINTMENT_ID,
  NEXT_BUCKET_STORAGE: STORAGE,
  NEXT_ENDPOINT: ENDPOINT,
} = process.env;

const appwriteClient = new sdk.Client();

appwriteClient.setKey(API_KEY!).setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);

export const appwriteDatabases = new sdk.Databases(appwriteClient);
export const appwriteUsers = new sdk.Users(appwriteClient);
export const appwriteStorage = new sdk.Storage(appwriteClient);
export const appwriteMessaging = new sdk.Messaging(appwriteClient);
