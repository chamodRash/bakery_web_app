import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getVerificationTokenByPhone = async (phone: string) => {
  try {
    let { data: verificationtoken, error: retrieveUserError } = await supabase
      .from("verificationtoken")
      .select("*")
      .eq("phone", phone);

    if (retrieveUserError) {
      return null;
    }

    if (Array.isArray(verificationtoken) && verificationtoken.length > 0) {
      return verificationtoken[0];
    }
    return verificationtoken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: number) => {
  try {
    let { data: verificationtoken, error: retrieveUserError } = await supabase
      .from("verificationtoken")
      .select("*")
      .eq("token", token);

    if (retrieveUserError) {
      return null;
    }

    if (Array.isArray(verificationtoken) && verificationtoken.length > 0) {
      return verificationtoken[0];
    }
  } catch {
    return null;
  }
};
