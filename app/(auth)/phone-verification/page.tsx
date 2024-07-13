"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { OTPSchema } from "@/schemas";
import { verifyOTP } from "@/actions/verify-otp";

const PhoneVerificationPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      code: "",
    },
  });

  const onsubmit = (values: z.infer<typeof OTPSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      const otp = parseInt(values.code, 10);
      verifyOTP(otp)
        .then((response) => {
          if (response.error) {
            setError(response.error);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel={"Verify Phone Number"}
      backButtonLabel={"Already have an Account? Login Here."}
      backButtonHref={"/login"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex flex-col items-center space-y-2">
          <FormError message={error} />
          <FormSuccess message={success} />
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
              </div>
            )}
          />
          <Button variant={"link"}>Resend OTP</Button>
          <Button
            type={"submit"}
            className={"rounded-full"}
            size={"lg"}
            disabled={isPending}>
            Verify
          </Button>
        </form>
      </Form>
      {}
    </CardWrapper>
  );
};

export default PhoneVerificationPage;
