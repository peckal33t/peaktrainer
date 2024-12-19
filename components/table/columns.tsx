"use client";

import { Appointment } from "@/types/db.types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p>{appointment.client.name}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p>{appointment.client.email}</p>;
    },
  },
  {
    accessorKey: "primaryTrainer",
    header: "Trainer",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p>PT. {appointment.client.primaryTrainer}</p>;
    },
  },
];
