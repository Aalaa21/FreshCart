"use client";

import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormAction } from "../actions/login.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema } from "../schema/loginSchema";
import { LoginSchemaType } from "../schema/loginSchema";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const { handleSubmit, control, reset } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: LoginSchemaType) {
    setIsLoading(true);
    try {

    const isloggedInSuccessfully= await  signIn("credentials", {
       ...data,
        redirect:false,
       
      })
      console.log("SignIn response:", isloggedInSuccessfully);

      
      if (isloggedInSuccessfully?.ok) {
        // sucess message
        toast.success("User logged in successfully!", {
          position: "top-right",
        });

        reset();

        //navigate to home page
        router.push("/");
      }else{
        toast.error("Invalid email or password.", {
          position: "top-right",
        })
      }

    } catch (error) {
      // failed to register message
      toast.error("Failed to register user.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form
      className="w-2/3 mx-auto my-10"
      onSubmit={handleSubmit(handleLogin)}
    >
      <FieldGroup>
        {/* email input */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-email"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
                autoComplete="off"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* password input */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-password">Password</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-password"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" className="mt-4">
        Login
        {isloading && <Spinner />}
      </Button>
    </form>
  );
}
