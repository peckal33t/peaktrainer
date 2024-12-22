"use server";

import { ID, Query } from "node-appwrite";
import { appwriteDatabases, appwriteMessaging, appwriteUsers } from "../db";
import { parseStringify } from "../utilities";
import { Appointment } from "@/types/db.types";
import {
  CreateAppointmentParams,
  CreateUserParams,
  RegisterUserParams,
  UpdateAppointmentParams,
} from "@/types";
import { revalidatePath } from "next/cache";

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
  } catch (error: any) {
    if (error?.code === 409) {
      const existingUser = await appwriteUsers.list([
        Query.equal("email", [user.email]),
      ]);
      console.log("Existing user found:", existingUser);
      return existingUser.users[0];
    }

    throw new Error(
      `User creation failed: ${error.message || "Unknown error"}`
    );
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

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await appwriteDatabases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.error(error);
  }
};

export const getAppointments = async () => {
  try {
    const appointments = await appwriteDatabases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const documents = appointments.documents as Appointment[];

    const getCounts = (appointments: Appointment[]) => {
      return appointments.reduce(
        (acc, appointment) => {
          const statusKey = `${appointment.status}Count` as keyof typeof acc;
          acc[statusKey] = (acc[statusKey] || 0) + 1;
          return acc;
        },
        { scheduledCount: 0, pendingCount: 0, cancelledCount: 0 }
      );
    };

    const counts = getCounts(documents);

    return parseStringify({
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
  userId,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updateAppointment = await appwriteDatabases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_ID!,
      appointmentId,
      appointment
    );

    if (!updateAppointment) {
      throw new Error("No appointment was found!");
    }

    revalidatePath("/admin");
    return parseStringify(updateAppointment);
  } catch (error) {
    console.error(error);
  }
};

export const smsNotification = async (userId: string, message: string) => {
  try {
    const sendMessage = await appwriteMessaging.createSms(
      ID.unique(),
      message,
      [],
      [userId]
    );

    return parseStringify(sendMessage);
  } catch (error) {
    console.error(error);
  }
};
