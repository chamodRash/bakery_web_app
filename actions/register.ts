"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";
import otpGenerator from "otp-generator";

import { createClient } from "@/utils/supabase/server";
import { RegisterSchema } from "@/schemas";
import sendRegisterOTP from "@/lib/sendMsgs";
import { generateRegisterOTP } from "@/lib/tokens";
import { getUserByPhone } from "@/data/user";

const supabase = createClient();

const signUpSupabase = async (values: z.infer<typeof RegisterSchema>) => {
  const data = {
    phone: values.phone.startsWith("0")
      ? "+94" + values.phone.slice(1)
      : `+94${values.phone}`,
    password: values.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }
};

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) return { error: "Inavalid Fields!" };

  const user = await getUserByPhone(values.phone);
  console.log(user);

  if (user && user.length > 0) {
    return { error: "User already exists!" };
  }

  const hashedPassword = await bcryptjs.hash(values.password, 10);

  const { data, error: dbError } = await supabase.from("user").insert([
    {
      phone: values.phone,
      name: values.name,
      password: hashedPassword,
      role: "USER",
    },
  ]);

  if (dbError) {
    return { error: "Something went wrong!" };
  }

  const otp = await generateRegisterOTP(values.phone);

  const isOTPsent = await sendRegisterOTP(values.phone, otp);

  if (!isOTPsent.sent) {
    return { error: "Failed to send OTP. Try Login again" };
  }

  await signUpSupabase(values);

  revalidatePath("/", "layout");
  redirect("/phone-verification");
}
