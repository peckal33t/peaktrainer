"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomButton from "../CustomButton";
import { useState } from "react";
import { createUser, registerClient } from "@/lib/service/client";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderSelect, Trainers } from "@/variables/variables";
import { Label } from "../ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Gender, RegisterUserParams, User } from "@/types";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  address: z.string().min(3, {
    message: "Address must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
  phone: z
    .string()
    .refine(
      (value) => /^\+46\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(value),
      "Please enter a valid phone number."
    ),
  birthDate: z.date({
    required_error: "Date of Birth is required.",
  }),
  gender: z.enum(["Male", "Female"]),
  kg: z.string().refine((value) => /^\d+$/.test(value), {
    message: "Please enter a valid number for kg (no negative values).",
  }),
  height: z.string().refine((value) => /^\d+$/.test(value), {
    message: "Please enter a valid number for height (no negative values).",
  }),
  trainerName: z.string().min(1, { message: "Please select a trainer." }),
  healthConcerns: z.string().max(100, {
    message: "Health concerns cannot exceed 100 characters.",
  }),
  specialRequirements: z.string().max(100, {
    message: "Special requirements cannot exceed 100 characters.",
  }),
  activityLevel: z.string().max(100, {
    message: "Activity level description cannot exceed 100 characters.",
  }),
  fitnessGoals: z.string().max(100, {
    message: "Fitness goals cannot exceed 100 characters.",
  }),
  agreeTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions.",
  }),
  acknowledgePolicy: z.boolean().refine((value) => value === true, {
    message: "You must acknowledge the privacy policy.",
  }),
});

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      kg: "",
      height: "",
      birthDate: new Date(Date.now()),
      gender: "Male" as Gender,
      trainerName: "",
      healthConcerns: "",
      specialRequirements: "",
      activityLevel: "",
      fitnessGoals: "",
      agreeTerms: false,
      acknowledgePolicy: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const clientData: RegisterUserParams = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        address: values.address,
        kg: values.kg,
        height: values.height,
        birthDate: new Date(values.birthDate).toISOString(),
        gender: values.gender as Gender,
        primaryTrainer: values.trainerName || "Default Trainer",
        agreement: values.agreeTerms,
      };

      const client = await registerClient(clientData);

      if (client) {
        router.push(`/clients/${user.$id}/create-appointment`);
      }
    } catch (error) {
      console.error("Error registering client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[496px] sub-container">
      <h1 className="text-lg">Personal Information</h1>
      <br />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 flex-1"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      className="form-input shad-input border-0"
                    />
                  </FormControl>
                  <FormMessage className="shad-error" />
                </FormItem>
              )}
            />
            <div className="flex flex-col xl:flex-row gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your email"
                        {...field}
                        className="form-input shad-input border-0"
                      />
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your phone number"
                        {...field}
                        className="form-input shad-input border-0"
                      />
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-6 xl:flex-row">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Birth Date</FormLabel>
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
                          dateFormat="MM/dd/yyyy"
                          className="date-picker form-input shad-input border-0 cursor-pointer"
                          placeholderText="Select date"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex h-11 gap-6 xl:justify-between"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {GenderSelect.map((index) => (
                          <div key={index} className="radio-group">
                            <RadioGroupItem value={index} id={index} />
                            <Label htmlFor={index} className="cursor-pointer">
                              {index}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Your password"
                        {...field}
                        className="form-input shad-input border-0"
                      />
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your address"
                        {...field}
                        className="form-input shad-input border-0"
                      />
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg mt-8">Physical Information</h2>
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
            <div className="flex flex-col xl:flex-row gap-6">
              <FormField
                control={form.control}
                name="kg"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Kg</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your kg"
                        {...field}
                        className="form-input shad-input border-0"
                      />
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your height"
                        {...field}
                        className="form-input shad-input border-0"
                      />
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col xl:flex-row gap-6">
              <FormField
                control={form.control}
                name="healthConcerns"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Health Concerns</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any medical conditions, prior injuries, or physical limitations"
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
                name="specialRequirements"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Special Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any specific needs or requirements"
                        {...field}
                        className="shad-textArea rounded"
                      />
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col xl:flex-row gap-6">
              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Physical Activity</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your typical physical activity level (e.g., sedentary, active, etc.)."
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
                name="fitnessGoals"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Fitness Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your fitness goals (e.g., weight loss, muscle gain, endurance)."
                        {...field}
                        className="shad-textArea rounded"
                      />
                    </FormControl>
                    <FormMessage className="shad-error" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg mt-8">Terms and Conditions</h2>
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="agreeTerms"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="agreeTerms"
                      className="checkbox-label m-0"
                    >
                      I agree to the{" "}
                      <span className="underline">terms and conditions.</span>
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acknowledgePolicy"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="acknowledgePolicy"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="acknowledgePolicy"
                      className="checkbox-label m-0"
                    >
                      I acknowledge that my data will be processed in accordance
                      with the{" "}
                      <span className="underline">privacy policy.</span>
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <CustomButton isLoading={isLoading}>Submit</CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
