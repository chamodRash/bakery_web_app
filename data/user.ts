import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getUserByPhone = async (phone: string) => {
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
