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
import { createUser } from "@/lib/service/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
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
      (value) => /^\+(\d{1,15})$/.test(value),
      "Please enter a valid phone number in international format (e.g., +46701234567)."
    ),
});

const ClientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
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

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your phone number"
                    {...field}
                    onChange={field.onChange}
                    className="form-input shad-input border-0"
                  />
                </FormControl>
                <FormMessage className="shad-error" />
              </FormItem>
            )}
          />
        </div>
        <CustomButton isLoading={isLoading}>Get Started</CustomButton>
      </form>
    </Form>
  );
};

export default ClientForm;
