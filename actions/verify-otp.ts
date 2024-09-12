"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getVerificationTokenByToken } from "@/data/token";
import { getUserByPhone } from "@/data/user";
import { revalidatePath } from "next/cache";

export async function verifyOTP(token: number) {
  const supabase = createClient();
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exists!" };
  }

  const hasExpired = new Date(existingToken?.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const user = await getUserByPhone(existingToken.phone);

  if (!user) {
    return { error: "User does not exists!" };
  }

  await supabase
    .from("profiles")
    .update({ phoneverified: new Date() })
    .eq("phone", existingToken.phone);

  await supabase.from("verificationtoken").delete().eq("id", existingToken.id);

  revalidatePath("/", "layout");
  redirect("/");
}
