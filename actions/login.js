"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";

export const Login = async (values) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) return { error: "Inavalid Fields!" };

  return {
    success: "E-mail sent",
  };
};
