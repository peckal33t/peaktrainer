"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Appointment } from "@/types/db.types";
import AppointmentForm from "./forms/AppointmentForm";

const AppointmentAction = ({
  actionType,
  clientId,
  userId,
  appointment,
}: {
  actionType: "schedule" | "cancel";
  clientId: string;
  userId: string;
  appointment?: Appointment;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={`${
            actionType === "schedule" ? "text-green-500" : "text-red-500"
          } capitalize`}
          variant="ghost"
        >
          {actionType}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-4">
          <DialogTitle className="capitalize">
            {actionType} Appointment
          </DialogTitle>
          <DialogDescription>
            Please confirm to {actionType} the appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          userId={userId}
          clientId={clientId}
          type={actionType}
          appointment={appointment}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentAction;
