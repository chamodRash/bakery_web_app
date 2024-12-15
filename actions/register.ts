"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";
import otpGenerator from "otp-generator";

import { createClient } from "@/utils/supabase/server";
import { RegisterSchema } from "@/schemas";
import {sendRegisterOTP} from "@/lib/sendMsgs";
import { generateRegisterOTP } from "@/lib/tokens";
import { getUserByPhone } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/token";

const supabase = createClient();

const signUpSupabase = async (values: z.infer<typeof RegisterSchema>) => {
  const data = {
    phone: values.phone.startsWith("0")
      ? "+94" + values.phone.slice(1)
      : `+94${values.phone}`,
    password: values.password,
    options: {
      data: {
        full_name: values.name,
        user_phone: values.phone,
        user_role: "USER",
      },
    },
  };

  const { data: signUpError, error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }
};

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) return { error: "Inavalid Fields!" };

  if (!values.code) {
    const otp = await generateRegisterOTP(values.phone);

    const isOTPsent = await sendRegisterOTP(values.phone, otp);

    if (!isOTPsent.sent) {
      return { error: "Failed to send OTP. Try Login again" };
    }

    return { success: "OTP Sent!" };
  }

  if (values.code) {
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

    const res = await signUpSupabase(values);
    if (res?.error) return { error: res.error };

    await supabase
      .from("profiles")
      .update({ phoneverified: new Date() })
      .eq("phone", existingToken.phone);

    const trySignUp = await supabase
      .from("verificationtoken")
      .delete()
      .eq("id", existingToken.id);

    if (trySignUp.error) {
      return { error: trySignUp.error.message };
    }

    revalidatePath("/", "layout");
    redirect("/");
  }
}
