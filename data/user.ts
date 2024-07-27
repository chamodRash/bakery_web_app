import { guestLogin } from "@/actions/guest-login";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getSessionUser = async () => {
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
  try {
    let { data: user, error: retrieveUserError } = await supabase
      .from("user")
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

export const getUserByPhone = async (phone: string = "") => {
  try {
    let { data: user, error: retrieveUserError } = await supabase
      .from("user")
      .select("*")
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

export const getUserByid = async (id: string) => {
  try {
    let { data: user, error: retrieveUserError } = await supabase
      .from("user")
      .select("*")
      .eq("id", id);

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
