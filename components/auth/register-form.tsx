"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";

import { Phone } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { PencilLine } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signInGuest } from "@/actions/login";

const RegisterForm = () => {
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isOTP, setIsOTP] = useState(false);
  const [showResendOTP, setShowResendOTP] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      code: "",
    },
  });

  const onsubmit = (values: z.infer<typeof RegisterSchema>) => {
    setErrors("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          setErrors(data?.error);
        }
        if (data?.success == "OTP Sent!") {
          setIsOTP(true);
          setTimeout(() => {
            setShowResendOTP(true);
          }, 60000);
        }
      });
    });
  };

  const guestLogin = () => {
    startTransition(() => {
      signInGuest().then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
        }

        setTimeout(() => {
          router.push("/");
        }, 1000);
      });
    });
  };

  const resendCode = () => {
    setErrors("");
    setSuccess("");

    startTransition(() => {
      const phone = form.getValues("phone"); // Get the phone number from the form values
      if (!phone) {
        toast.error("Phone number is required to resend OTP.");
        return;
      }

      fetch("/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.error) {
            setErrors(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
            toast.success(data.success);
          }
        })
        .catch(() => {
          setErrors("Failed to resend OTP. Please try again.");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel={isOTP ? "Verify Phone Number" : "Register"}
      backButtonLabel={"Already have an Account? Login Here."}
      backButtonHref={"/login"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
          <FormError message={errors} />
          <FormSuccess message={success} />
          {isOTP && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={"code"}
                render={({ field }) => (
                  <div className="space-y-5">
                    <FormItem className="group space-y-1 flex flex-col items-center rounded-full bg-transparent pl-5 pr-3 py-1 text-sm shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50">
                      {/* <FormLabel>OTP Code</FormLabel> */}
                      <FormDescription>
                        This OTP is valid for 5 minutes only
                      </FormDescription>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </FormItem>
                    <FormMessage className={"text-xs ml-5"} />
                    {showResendOTP && (
                      <p
                        onClick={() => resendCode}
                        className="text-sm text-primary text-center underline">
                        Resend OTP
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          )}
          {!isOTP && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <div>
                    <FormItem className="group space-y-1 flex items-center rounded-full border border-input bg-transparent pl-5 pr-3 py-1 text-sm shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
                      <FormLabel>
                        <PencilLine className="text-muted-foreground group-focus-within:text-primary" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your Name"
                          name="name"
                          type="text"
                          disabled={isPending}
                          className={
                            "border-0 shadow-none focus-visible:outline-0 "
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className={"text-xs ml-5"} />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name={"phone"}
                render={({ field }) => (
                  <div>
                    <FormItem className="group space-y-1 flex items-center rounded-full border border-input bg-transparent pl-5 pr-3 py-1 text-sm shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
                      <FormLabel>
                        <Phone className="text-muted-foreground group-focus-within:text-primary" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value !== "" ? field.value : ""}
                          placeholder="0771234567"
                          type="text"
                          name="phone"
                          disabled={isPending}
                          className={
                            "border-0 shadow-none focus-visible:outline-0"
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className={"text-xs ml-5"} />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <div>
                    <FormItem className="group space-y-1 flex items-center rounded-full border border-input bg-transparent pl-5 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 focus-within:outline-none focus-within:ring-1 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
                      <FormLabel>
                        <LockKeyhole className="text-muted-foreground text-lg group-focus-within:text-primary" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Password"
                          type="password"
                          name="password"
                          disabled={isPending}
                          className={
                            "border-0 shadow-none focus-visible:outline-0"
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className={"text-xs ml-5"} />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name={"confirmPassword"}
                render={({ field }) => (
                  <div>
                    <FormItem className="group space-y-1 flex items-center rounded-full border border-input bg-transparent pl-5 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 focus-within:outline-none focus-within:ring-1 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
                      <FormLabel>
                        <LockKeyhole className="text-muted-foreground text-lg group-focus-within:text-primary" />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Confirm Password"
                          type="password"
                          name="confirmPassword"
                          disabled={isPending}
                          className={
                            "border-0 shadow-none focus-visible:outline-0"
                          }
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage className={"text-xs ml-5"} />
                  </div>
                )}
              />
            </div>
          )}
          <div className="flex flex-row-reverse items-center justify-center gap-2">
            <Button
              type={"submit"}
              className={"rounded-full"}
              size={"lg"}
              disabled={isPending}>
              Register
            </Button>
            {!isOTP && (
              <Button
                onClick={() => {
                  guestLogin();
                }}
                className={"rounded-full"}
                variant={"secondary"}
                size={"lg"}>
                Login as Guest
              </Button>
            )}
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
