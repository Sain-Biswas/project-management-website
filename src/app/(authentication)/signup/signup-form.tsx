"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/server/auth/auth-client";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";

export const signupSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  email: z.email({ error: "Please enter a valid email." }),
  password: z
    .string()
    .min(8, { error: "The password must be at least 8 characters long." })
});

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: standardSchemaResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    await signUp
      .email(
        {
          email: values.email,
          name: values.name,
          password: values.password
        },
        {
          onSuccess: () => {
            toast.success("Signup successful", {
              description: "Redirecting to dashboard."
            });
            router.replace("/dashboard");
          },
          onError: ({ error }) => {
            toast.error("Signup failed.", { description: error.message });
          }
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((_error) => {});
  }

  return (
    <Form {...signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={signupForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@axiom.app" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signupForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="**********"
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
              </FormControl>
              <FormDescription className="flex items-center justify-between">
                <Button variant={"link"} className="p-0">
                  <Link href={"#"}>forgot password?</Link>
                </Button>
                <span className="flex gap-2">
                  <Checkbox
                    value={showPassword ? "on" : "off"}
                    onCheckedChange={() => setShowPassword((curr) => !!!curr)}
                  />
                  <span>show password</span>
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  );
}
