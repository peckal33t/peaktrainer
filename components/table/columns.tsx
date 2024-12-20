"use client";

import { formatDateTime } from "@/lib/utilities";
import { Appointment } from "@/types/db.types";
import { Trainers } from "@/variables/variables";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const statusColors: Record<string, string> = {
  scheduled: "text-green-500",
  pending: "text-blue-500",
  cancelled: "text-red-500",
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
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p>{appointment.client.phone}</p>;
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
    accessorKey: "statusType",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      const statusColor =
        statusColors[appointment.statusType] || "text-gray-500";
      return (
        <p className={`capitalize ${statusColor}`}>{appointment.statusType}</p>
      );
    },
  },
  {
    accessorKey: "appointmentDate",
    header: "Appointment Date",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p>{formatDateTime(appointment.appointmentDate).dateTime}</p>;
    },
  },
  {
    accessorKey: "primaryTrainer",
    header: "Trainer",
    cell: ({ row }) => {
      const trainer = Trainers.find(
        (pt) => pt.name === row.original.trainerName
      );
      return (
        <p>
          <span className="text-orange-500">PT</span>. {trainer?.name}
        </p>
      );
    },
  },
];
