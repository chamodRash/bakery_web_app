"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { ChangePhoneSchema } from "@/schemas";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { changePhoneNumber } from "@/actions/change-phone-number";

interface ViewProfileUser {
  id: string;
  phone: string;
}

export const ChangePhoneNumber = ({ id, phone }: ViewProfileUser) => {
  const [isPending, startTransition] = useTransition();
  const [isOTP, setIsOTP] = useState(false);

  const form = useForm<z.infer<typeof ChangePhoneSchema>>({
    resolver: zodResolver(ChangePhoneSchema),
    defaultValues: {
      phone: phone || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ChangePhoneSchema>) => {
    startTransition(() => {
      changePhoneNumber(values)
        .then((data) => {
          if (data?.success === "OTP Sent!") {
            setIsOTP(true);
          }
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Card className="w-[30rem] bg-white rounded-xl border-none">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          ⚙️ Change Phone Number
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {!isOTP && (
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={phone || ""}
                          disabled={isPending}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isOTP && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="code"
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
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-56"
                variant={"default"}
                disabled={isPending}
                onClick={() => setIsOTP(true)}>
                {isOTP ? "Verify OTP" : "Send OTP"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
