"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Phone } from "lucide-react";
import { LockKeyhole } from "lucide-react";

import { LoginSchema } from "@/schemas";
import Image from "next/image";
import { adminLogin } from "@/actions/admin-login";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isOTP, setIsOTP] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: "",
      password: "",
      code: "",
    },
  });

  const onsubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      adminLogin(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
          if (data?.success == "OTP Sent!") {
            setIsOTP(true);
          } else if (data?.success == "Logged in!") {
            // redirect to admin dashboard
            router.push("/admin");
          }
        }
      });
    });
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-center">
      <Image
        src={"/auth_bg.png"}
        width={1000}
        height={1000}
        alt={"background img"}
        className={"w-full h-full object-cover absolute left-0 top-0 -z-40"}
      />
      <div className="w-full h-full flex flex-col items-center justify-center backdrop-blur-sm">
        <CardWrapper
          headerLabel={isOTP ? "Verify Your Admin Login" : "Admin Login"}
          backButtonLabel={"Forgot Password?"}
          backButtonHref={"/admin/forgot-password"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
              {!isOTP && (
                <div className="space-y-4">
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
                              placeholder="0771234567"
                              value={field.value !== "" ? field.value : ""}
                              type="text"
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
                      </div>
                    )}
                  />
                </div>
              )}
              <Button
                type="submit"
                className={"w-full"}
                size={"lg"}
                disabled={isPending}>
                Login
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};

export default LoginForm;
