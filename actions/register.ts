"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { RegisterSchema } from "@/schemas";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) return { error: "Inavalid Fields!" };

  const { name, phone, password } = validateFields.data;

  if (user) {
    return { error: "Phone number already in use." };
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const formData = {
    phone: values.phone.startsWith("0")
      ? "+94" + values.phone.slice(1)
      : `+94${values.phone}`,
    password: values.password,
  };

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
