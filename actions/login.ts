"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { LoginSchema } from "@/schemas";

export async function login(values: z.infer<typeof LoginSchema>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    phone: values.phone.startsWith("0")
      ? "+94" + values.phone.slice(1)
      : `+94${values.phone}`,
    password: values.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
