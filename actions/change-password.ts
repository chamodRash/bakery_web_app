"use server";

import * as z from "zod";
import { ChangePasswordSchema } from "@/schemas";
import { createClient } from "@/utils/supabase/server";

export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>
) => {
  const supabase = createClient();

  const validateFields = ChangePasswordSchema.safeParse(values);
  if (!validateFields.success) return { error: "Inavalid Fields!" };

  const { data, error } = await supabase.auth.updateUser({
    password: values.newPassword,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Password Changed!" };
};
