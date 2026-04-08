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
import { registerSchema, RegisterSchemaType } from "../schema/register.schema";
import { registerFormAction } from "../actions/register.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner"


export default function RegisterForm() {
  const router= useRouter();
  const[isloading,setIsLoading]=useState(false);
  const { handleSubmit, control, reset } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handleRegister(data: RegisterSchemaType) {
    setIsLoading(true);
    try {
      const isregisteredSuccessfully = await registerFormAction(data);
      if (isregisteredSuccessfully) {
        // sucess message
        toast.success("User registered successfully!",{
          position:"top-right",
        });

        reset();

        //navigate to login page
        router.push("/Auth/login");
      }
    } catch (error) {
      // failed to register message
      toast.error("Failed to register user.",
        {
          position:"top-right",
        }
      );
    }
    finally{
      setIsLoading(false);
    }
  }
  return (
    <form
      className="w-2/3 mx-auto my-10"
      onSubmit={handleSubmit(handleRegister)}
    >
      <FieldGroup>
        {/* name input */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-name"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your name"
                autoComplete="off"
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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

        {/* repassword input */}
        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-repassword">
                Re-enter Password
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-repassword"
                aria-invalid={fieldState.invalid}
                placeholder="Re-enter your password"
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* phone input */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-phone">Phone</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-phone"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your phone number"
                autoComplete="off"
                type="tel"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" className="mt-4">
        Register
        {isloading && <Spinner />}
      </Button>
    </form>
  );
}
