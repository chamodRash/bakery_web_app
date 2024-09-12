import otpGenerator from "otp-generator";
import { createClient } from "@/utils/supabase/server";
import { getVerificationTokenByPhone } from "@/data/token";

// Function to generate OTP
export const generateRegisterOTP = async (phone: string) => {
  const supabase = createClient();
  const otpString = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const otp = parseInt(otpString, 10);
  const expires = new Date(new Date().getTime() + 300 * 1000);

  const verificationtoken = await getVerificationTokenByPhone(phone);

  if (verificationtoken.token) {
    await supabase.from("verificationtoken").delete().eq("phone", phone);
  }

  const insertOTP = await supabase.from("verificationtoken").insert([
    {
      phone: phone,
      token: otp,
      expires: expires,
    },
  ]);
  console.log(insertOTP);

  return otp;
};
