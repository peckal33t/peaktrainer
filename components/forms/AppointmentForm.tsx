"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomButton from "../CustomButton";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Trainers, Training } from "@/variables/variables";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "../ui/textarea";
import { createAppointment, updateAppointment } from "@/lib/service/client";
import {
  CreateSchema,
  ScheduleSchema,
  CancelSchema,
  getAppSchema,
} from "@/lib/schema";
import { Appointment } from "@/types/db.types";

type AppointmentFormProps = {
  userId: string;
  clientId: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};

const AppointmentForm = ({
  userId,
  clientId,
  type,
  appointment,
  setIsOpen,
}: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = getAppSchema(type);

  const form = useForm<z.infer<typeof CreateSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trainerName: appointment ? appointment.trainerName : "",
      appointmentDate: appointment
        ? new Date(appointment?.appointmentDate)
        : new Date(Date.now()),
      trainingExperience: appointment ? appointment.trainingExperience : "",
      additionalNotes: appointment?.additionalNotes || "",
      trainingType: appointment?.trainingType,
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateSchema>) => {
    setIsLoading(true);

    let statusType;
    switch (type) {
      case "schedule":
        statusType = "scheduled";
        break;
      case "cancel":
        statusType = "cancelled";
        break;
      default:
        statusType = "pending";
    }

    try {
      if (type === "create") {
        const appData: any = {
          userId,
          client: clientId,
          trainerName: values.trainerName,
          appointmentDate: new Date(values.appointmentDate),
          trainingExperience: values.trainingExperience,
          additionalNotes: values.additionalNotes,
          cancellationReason: values.cancellationReason,
          trainingType: values.trainingType,
          statusType,
        };

        const appointment = await createAppointment(appData);

        if (appointment) {
          form.reset();
          router.push(
            `/clients/${userId}/create-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appDataToUpdate: any = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            trainerName: values?.trainerName,
            appointmentDate: new Date(values?.appointmentDate),
            statusType,
            cancellationReason: values?.cancellationReason,
            additionalNotes: values?.additionalNotes,
            trainingType: values?.trainingType,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appDataToUpdate);

        if (updatedAppointment) {
          setIsOpen && setIsOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  let label;
  switch (type) {
    case "cancel":
      label = "Cancel Appointment";
      break;
    case "schedule":
      label = "Schedule Appointment";
      break;
    default:
      label = "Submit Appointment";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="text-xl">Appointment</h1>
            <p className="text-dark-700">
              Create a new appointment with your preferred trainer
            </p>
          </section>
        )}

        <div className="space-y-4">
          {type !== "cancel" && (
            <>
              <FormField
                control={form.control}
                name="trainerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Trainer</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="shad-select-trigger rounded">
                          <SelectValue placeholder="Select a trainer" />
                        </SelectTrigger>
                        <SelectContent className="shad-select-content">
                          {Trainers.map((trainer, i) => (
                            <SelectItem
                              key={trainer.name + i}
                              value={trainer.name}
                            >
                              <div className="flex cursor-pointer items-center gap-2">
                                <p>{trainer.name}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trainingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Training Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="shad-select-trigger rounded">
                          <SelectValue placeholder="Select training type" />
                        </SelectTrigger>
                        <SelectContent className="shad-select-content">
                          {Training.map((type, i) => (
                            <SelectItem key={type + i} value={type}>
                              <div className="flex cursor-pointer items-center gap-2">
                                <p>{type}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Appointment Date</FormLabel>
                    <FormControl>
                      <div className="flex rounded border border-dark-500 bg-dark-400 items-center">
                        <Calendar
                          height={20}
                          width={20}
                          className="ml-2 mb-1"
                        />
                        <DatePicker
                          selected={field.value}
                          onChange={(date: Date | null) => field.onChange(date)}
                          dateFormat="MM/dd/yyyy - h:mm aa"
                          showTimeSelect
                          className="date-picker form-input shad-input border-0 cursor-pointer"
                          placeholderText="Select date"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-6 xl:flex-row">
                <FormField
                  control={form.control}
                  name="trainingExperience"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Training Experience</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your previous training or fitness experience"
                          {...field}
                          className="shad-textArea rounded"
                        />
                      </FormControl>
                      <FormMessage className="shad-error" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter any specific goals, preferences, or requests for the session"
                          {...field}
                          className="shad-textArea rounded"
                        />
                      </FormControl>
                      <FormMessage className="shad-error" />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </div>

        {type === "cancel" && (
          <FormField
            control={form.control}
            name="cancellationReason"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Cancellation Reason</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a reason for cancelling the appointment"
                    {...field}
                    className="shad-textArea rounded"
                  />
                </FormControl>
                <FormMessage className="shad-error" />
              </FormItem>
            )}
          />
        )}

        <CustomButton
          className={`${
            type === "cancel"
              ? "shad-danger-btn"
              : "rounded bg-orange-600 text-white hover:bg-orange-500 mt-7"
          } w-full rounded`}
          isLoading={isLoading}
        >
          {label}
        </CustomButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
