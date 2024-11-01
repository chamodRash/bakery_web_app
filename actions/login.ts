"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { LoginSchema } from "@/schemas";
import { getUserByPhone } from "@/data/user";
import { generateRegisterOTP } from "@/lib/tokens";
import {sendRegisterOTP} from "@/lib/sendMsgs";
import { getVerificationTokenByToken } from "@/data/token";
import { toast } from "sonner";

const supabase = createClient();

const signInSupabase = async (values: z.infer<typeof LoginSchema>) => {
  const data = {
    phone: values.phone.startsWith("0")
      ? "+94" + values.phone.slice(1)
      : `+94${values.phone}`,
    password: values.password,
  };

  const { data: trysignInData, error } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    return { error: error.message };
  }

  return { success: trysignInData.user.id };
};

export async function login(values: z.infer<typeof LoginSchema>) {
  const user = await getUserByPhone(values.phone);

  if (user?.error) {
    return { error: user.error.message };
  }

  if (!user || user.length === 0) {
    return { error: "User does not exist!" };
  }

  if (!user.phoneverified && !values.code) {
    const otp = await generateRegisterOTP(values.phone);

    const isOTPsent = await sendRegisterOTP(values.phone, otp);

    if (!isOTPsent.sent) {
      return { error: "Failed to send OTP. Try Login again" };
    }

    return { success: "OTP Sent!" };
  }

  if (!user.phoneverified && values.code) {
    const existingToken = await getVerificationTokenByToken(
      Number(values.code)
    );

    if (!existingToken) {
      return { error: "OTP does not exists!" };
    }

    const hasExpired = new Date(existingToken?.expires) < new Date();

    if (hasExpired) {
      return { error: "OTP has expired!" };
    }

    await supabase
      .from("profiles")
      .update({ phoneverified: new Date() })
      .eq("phone", existingToken.phone);

    await supabase
      .from("verificationtoken")
      .delete()
      .eq("id", existingToken.id);
  }

  const trySignIn = await signInSupabase(values);

  if (trySignIn?.error) {
    return { error: trySignIn.error };
  }

  console.log(`${trySignIn.success} Logged In!`);

  revalidatePath("/", "layout");
  redirect("/");
}
