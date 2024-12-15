import { createClient } from "@/utils/supabase/client";

export const getVerificationTokenByPhone = async (phone: string) => {
  const supabase = createClient();

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
  const supabase = createClient();

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
