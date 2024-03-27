"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import Link from "next/link";
import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Login } from "@/actions/login";

import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export const LoginForm = () => {
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onsubmit = (values) => {
    setErrors("");
    setSuccess("");

    startTransition(() => {
      Login(values).then((data) => {
        setErrors(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel={"Login"}
      backBtnLabel={"Dont have an Account? Register Here."}
      backBtnHref={"/register"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
          <FormError message={errors} />
          <FormSuccess message={success} />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name={"id"}
              render={({ field }) => (
                <div>
                  <FormItem className="group space-y-1 flex items-center rounded-full border border-input bg-transparent pl-5 pr-3 py-1 text-sm shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
                    <FormLabel>
                      <FaPhoneAlt className="text-muted-foreground group-focus-within:text-primary" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Phone Number"
                        type="text"
                        disabled={isPending}
                        className={"border-0 shadow-none focus-visible:ring-0"}
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
                      <RiLockPasswordFill className="text-muted-foreground text-lg group-focus-within:text-primary" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
                        type="password"
                        disabled={isPending}
                        className={"border-0 shadow-none focus-visible:ring-0"}
                      />
                    </FormControl>
                  </FormItem>
                  <FormMessage className={"text-xs ml-5"} />
                </div>
              )}
            />
          </div>
          <div className="flex flex-row-reverse items-center justify-center gap-2">
            <Button
              type={"submit"}
              className={"rounded-full"}
              size={"lg"}
              disabled={isPending}>
              Login
            </Button>
            <Button
              className={"rounded-full"}
              variant={"secondary"}
              size={"lg"}>
              <Link href={"/"}>Login as Guest</Link>
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
