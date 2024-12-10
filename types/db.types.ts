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
