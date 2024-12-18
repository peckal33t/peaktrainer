import { z } from "zod";

export const CreateSchema = z.object({
  trainerName: z.string().min(1, { message: "Please select a trainer." }),
  appointmentDate: z.date({
    required_error: "Appointment date is required.",
  }),
  trainingExperience: z
    .string()
    .max(100, {
      message: "Training experience must be 100 characters or fewer.",
    })
    .optional(),
  additionalNotes: z
    .string()
    .max(100, {
      message: "Additional notes must be 100 characters or fewer.",
    })
    .optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleSchema = z.object({
  trainerName: z.string().min(1, { message: "Please select a trainer." }),
  appointmentDate: z.date({
    required_error: "Appointment date is required.",
  }),
  trainingExperience: z.string().optional(),
  additionalNotes: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelSchema = z.object({
  trainerName: z.string().optional(),
  appointmentDate: z.date().optional(),
  cancellationReason: z
    .string()
    .min(2, { message: "Cancellation reason must be at least 2 characters." })
    .max(500, {
      message: "Cancellation reason must be at most 500 characters.",
    }),
});

export function getAppSchema(type: string) {
  switch (type) {
    case "create":
      return CreateSchema;
    case "cancel":
      return CancelSchema;
    default:
      return ScheduleSchema;
  }
}
