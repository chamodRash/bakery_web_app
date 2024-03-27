"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";

export const Register = async (values) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) return { error: "Inavalid Fields!" };

  return {
    success: "E-mail sent",
  };
};
