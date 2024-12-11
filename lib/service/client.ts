"use server";

import { ID, Query } from "node-appwrite";
import { appwriteUsers } from "../db";
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
    console.error("Error creating user:", err); // Log error for debugging
    if (err.code === 409) {
      const docs = await appwriteUsers.list([
        Query.equal("email", [user.email]),
      ]);
      return docs.users[0];
    }
    throw new Error("Failed to create user."); // Re-throw error for upstream handling
  }
};
