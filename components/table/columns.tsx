"use client";

import { formatDateTime } from "@/lib/utilities";
import { Appointment } from "@/types/db.types";
import { Trainers } from "@/variables/variables";
import { ColumnDef } from "@tanstack/react-table";
import AppointmentAction from "../AppointmentAction";

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
      return <p>{appointment.client?.name || "Unknown Client"}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p>{appointment.client?.phone || "Unknown"}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p>{appointment.client?.email || "Unknown"}</p>;
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
        <p className={`capitalize ${statusColor} font-semibold`}>
          {appointment.statusType}
        </p>
      );
    },
  },
  {
    accessorKey: "appointmentDate",
    header: "Appointment Date",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p>
          {appointment.appointmentDate
            ? formatDateTime(appointment.appointmentDate).dateTime
            : "Unknown"}
        </p>
      );
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
          <span className="text-orange-500">PT</span>.{" "}
          {trainer?.name || "Unknown"}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: appointment } }) => {
      const isClientUnknown = !appointment.client?.$id;

      return (
        <div className="flex gap-1">
          <AppointmentAction
            actionType="schedule"
            clientId={appointment.client?.$id || ""}
            userId={appointment.userId}
            appointment={appointment}
            disabled={isClientUnknown}
          />
          <AppointmentAction
            actionType="cancel"
            clientId={appointment.client?.$id || ""}
            userId={appointment.userId}
            appointment={appointment}
            disabled={isClientUnknown}
          />
        </div>
      );
    },
  },
];
