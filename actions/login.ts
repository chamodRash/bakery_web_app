"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { LoginSchema } from "@/schemas";
import { getUserByPhone } from "@/data/user";
import { generateRegisterOTP } from "@/lib/tokens";
import sendRegisterOTP from "@/lib/sendMsgs";

const supabase = createClient();

const signInSupabase = async (values: z.infer<typeof LoginSchema>) => {
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
};

export async function login(values: z.infer<typeof LoginSchema>) {
  const user = await getUserByPhone(values.phone);

  if (!user.phoneverified) {
    const otp = await generateRegisterOTP(values.phone);

    const isOTPsent = await sendRegisterOTP(values.phone, otp);

    if (!isOTPsent.sent) {
      return { error: "Failed to send OTP. Try Login again" };
    }

    await signInSupabase(values);

    revalidatePath("/", "layout");
    redirect("/phone-verification");
  }

  await signInSupabase(values);

  revalidatePath("/", "layout");
  redirect("/");
}
