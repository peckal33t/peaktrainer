"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomButton from "../CustomButton";
import { useState } from "react";
import { createUser } from "@/lib/service/client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Trainers } from "@/variables/variables";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formSchema = z.object({
  trainerName: z.string().min(1, { message: "Please select a trainer." }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  appointmentDate: z.date({
    required_error: "Appointment date is required.",
  }),
  phone: z
    .string()
    .refine(
      (value) => /^\+46\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(value),
      "Please enter a valid phone number."
    ),
});

type AppointmentFormProps = {
  userId: string;
  clientId: string;
  type: "create" | "cancel";
};

const AppointmentForm = ({ userId, clientId, type }: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trainerName: "",
      appointmentDate: new Date(Date.now()),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      console.log("Environment Variables:");
      console.log("NEXT_PUBLIC_ENDPOINT:", process.env.NEXT_PUBLIC_ENDPOINT);
      console.log(
        "NEXT_PUBLIC_PROJECT_ID:",
        process.env.NEXT_PUBLIC_PROJECT_ID
      );
      console.log("NEXT_PUBLIC_API_KEY:", process.env.NEXT_PUBLIC_API_KEY);

      const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
      const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;

      if (!endpoint || !projectId || !apiKey) {
        throw new Error("Missing required environment variables");
      }

      const user = {
        name: values.trainerName,
        email: values.email,
        phone: values.phone,
      };

      const createNewUser = await createUser(user);

      if (createNewUser) {
        router.push(`/clients/${createNewUser.$id}/register`);
      } else {
        console.error("User creation failed or returned an invalid response.");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="text-xl">Appointment</h1>
          <p className="text-dark-700">
            Create a new appointment with your preferred trainer.
          </p>
        </section>
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
            </>
          )}
        </div>
        <CustomButton isLoading={isLoading}>Get Started</CustomButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
