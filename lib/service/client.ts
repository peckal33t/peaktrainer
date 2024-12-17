"use server";

import { ID, Query } from "node-appwrite";
import { appwriteDatabases, appwriteUsers } from "../db";
import { parseStringify } from "../utilities";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await appwriteUsers.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser);
  } catch (err: any) {
    console.error("Error creating user:", err);
    if (err.code === 409) {
      const docs = await appwriteUsers.list([
        Query.equal("email", [user.email]),
      ]);
      return docs.users[0];
    }
    throw new Error("Failed to create user.");
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await appwriteUsers.get(userId);

    return parseStringify(user);
  } catch (err) {
    console.error(err);
  }
};

export const registerClient = async ({ ...client }: RegisterUserParams) => {
  try {
    const newClient = await appwriteDatabases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_CLIENT_ID!,
      ID.unique(),
      client
    );

    return parseStringify(newClient);
  } catch (error) {
    console.error(error);
  }
};

export const getClient = async (userId: string) => {
  try {
    const clients = await appwriteDatabases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_CLIENT_ID!,
      [Query.equal("userId", userId)]
    );

    return parseStringify(clients.documents[0]);
  } catch (err) {
    console.error(err);
  }
};
