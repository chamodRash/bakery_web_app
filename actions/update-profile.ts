"use server";

import * as z from "zod";
import { UpdateProfileSchema } from "@/schemas";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function updateProfile(
  values: z.infer<typeof UpdateProfileSchema>
) {
  const { name, phone, address } = values;

  const { data: authData, error: authError } = await supabase.auth.updateUser({
    phone:
      values.phone?.startsWith("0") ?? ""
        ? "+94" + values.phone?.slice(1)
        : `+94${values.phone}`,
    data: {
      full_name: name,
      user_phone: phone,
      user_role: "USER",
    },
  });

  const { data, error } = await supabase
    .from("profiles")
    .update({
      name,
      address,
    })
    .eq("phone", phone);

  if (error) {
    return { error: error.message };
  }
  if (authError) {
    return { error: authError.message };
  }

  return { success: "Profile updated successfully!" };
}
