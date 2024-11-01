"use server";

import { guestLogin } from "@/actions/guest-login";
import { createClient } from "@/utils/supabase/server";

export const getSessionUser = async () => {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      await guestLogin();
      return null;
    }

    const phone = `0${user?.phone?.slice(2)}`;

    const dbuser = await getSessionUserByPhone(phone);

    return dbuser;
  } catch {
    return null;
  }
};

export const getSessionUserByPhone = async (phone: string = "") => {
  const supabase = createClient();

  try {
    let { data: user, error: retrieveUserError } = await supabase
      .from("profiles")
      .select("id, phone, name, role, loyaltypoints")
      .eq("phone", phone);

    if (retrieveUserError) {
      return null;
    }

    if (Array.isArray(user) && user.length > 0) {
      return user[0];
    }
    return user;
  } catch {
    return null;
  }
};
