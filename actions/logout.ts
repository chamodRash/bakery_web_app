"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logout = async () => {
  const supabase = createClient();

  // sign out from the current session only
  await supabase.auth.signOut({ scope: "local" });

  // Wait until the session is fully cleared
  await new Promise((resolve) => setTimeout(resolve, 500));

  revalidatePath("/login", "layout");
  redirect("/login");
};
