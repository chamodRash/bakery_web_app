"use server";

import { createClient } from "@/utils/supabase/server";

export const addToCart = async (
  productId: number,
  quantity: number,
  price: number
) => {
  const supabase = createClient();
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();
  const userId = user?.id;
  const total = quantity * price;

  const { data, error } = await supabase.from("cart").insert([
    {
      userid: userId,
      productid: productId,
      quantity: quantity,
      total: total,
      status: true,
    },
  ]);

  return { data, error };
};
