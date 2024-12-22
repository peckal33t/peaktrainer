import { Appointment } from "./db.types";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  gender: Gender;
  address: string;
  kg: string;
  height: string;
  birthDate: string;
  primaryTrainer: string;
  password: string;
  agreement: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  client: string;
  trainerName: string;
  trainingExperience: string;
  appointmentDate: string;
  statusType: Status;
  additionalNotes: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  appointment: Appointment;
  userId: string;
  type: string;
  timeZone: string;
};
