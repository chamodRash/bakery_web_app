"use server";

import { getVerificationTokenByToken } from "@/data/token";
import { sendRegisterOTP } from "@/lib/sendMsgs";
import { generateRegisterOTP } from "@/lib/tokens";
import { createClient } from "@/utils/supabase/server";

export const checkUserExists = async (phoneNumber: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("phone", phoneNumber)
    .single();

  if (error) {
    return { error: "Failed to check user" };
  }

  return data;
};

export const sendOtp = async (phoneNumber: string) => {
  const otp = await generateRegisterOTP(phoneNumber);

  if (!otp) {
    return { error: "Failed to generate OTP" };
  }
  // Implement OTP sending logic here
  const sendmsg = await sendRegisterOTP(phoneNumber, otp);
  if (!sendmsg) {
    return { error: "Failed to send OTP" };
  }
  return { success: "OTP Sent!" };
};

export const validateOtp = async (otp: number) => {
  // Implement OTP validation logic here
  const getotp = await getVerificationTokenByToken(otp);
  if (!getotp) {
    return { error: "OTP is incorrect!" };
  }

  const hasExpired = new Date(getotp?.expires) < new Date();

  if (hasExpired) {
    return { error: "OTP has expired!" };
  }

  return { success: "OTP is correct!" };
};

export const updatePassword = async (newPassword: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error("Failed to update password");
  }

  return data;
};
