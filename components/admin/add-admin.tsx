"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LockKeyhole, PencilLine, Phone } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { adminRegister } from "@/actions/admin-register";
import toast from "react-hot-toast";

interface AddAdminFormProps {
  children: React.ReactNode;
}

const AddAdminForm = ({ children }: AddAdminFormProps) => {
  // const [errors, setErrors] = useState("");
  //   const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isOTP, setIsOTP] = useState(false);

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
    startTransition(() => {
      adminRegister(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data.success);
          setIsOTP(true);
        }
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
        </DialogHeader>
        <div className="w-11/12 mx-auto my-5 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
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
              {!isOTP && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name={"name"}
                    render={({ field }) => (
                      <div>
                        <FormItem className="group space-y-1 flex items-center rounded-xl border border-input bg-transparent pl-5 pr-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-primary focus-within:ring-2 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
                          <FormLabel>
                            <PencilLine className="text-muted-foreground group-focus-within:text-primary" />
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Name"
                              name="name"
                              type="text"
                              disabled={isPending}
                              className={
                                "border-0 shadow-none focus-visible:!outline-none "
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
                        <FormItem className="group space-y-1 flex items-center rounded-xl border border-input bg-transparent pl-5 pr-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-primary focus-within:ring-2 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
                          <FormLabel>
                            <Phone className="text-muted-foreground group-focus-within:text-primary" />
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value !== "" ? field.value : ""}
                              placeholder="Phone Number"
                              type="text"
                              name="phone"
                              disabled={isPending}
                              className={
                                "border-0 shadow-none focus-visible:!outline-none"
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
                        <FormItem className="group space-y-1 flex items-center rounded-xl border border-input bg-transparent pl-5 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 focus-visible:outline-primary focus-within:ring-2 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
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
                                "border-0 shadow-none focus-visible:!outline-none"
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
                        <FormItem className="group space-y-1 flex items-center rounded-xl border border-input bg-transparent pl-5 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 focus-visible:outline-primary focus-within:ring-2 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
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
                                "border-0 shadow-none focus-visible:!outline-none"
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
              <Button
                className="w-full"
                type={"submit"}
                size={"lg"}
                disabled={isPending}>
                Register
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminForm;
