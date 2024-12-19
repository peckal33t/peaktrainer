import { Models } from "node-appwrite";

export interface Client extends Models.Document {
  email: string;
  phone: string;
  userId: string;
  name: string;
  agreement: boolean;
  gender: Gender;
  kg: string;
  height: string;
  birthDate: string;
  primaryTrainer: string;
}

export interface Appointment extends Models.Document {
  client: Client;
  appointmentDate: Date;
  trainingExperience: string;
  additionalNotes: string;
  trainerName: string;
  statusType: Status;
  userId: string;
  cancellationReason: string;
  trainingType: string;
}
