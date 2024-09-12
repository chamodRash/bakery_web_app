"use server";

import { createClient } from "@/utils/supabase/server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const guestLogin = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
