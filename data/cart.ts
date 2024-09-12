"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const getCartCount = async () => {
  const session = await supabase.auth.getUser();
  const userId = session.data.user?.id;

  const { data, error } = await supabase
    .from("cart")
    .select("productid")
    .eq("userid", userId);

  return data?.length;
};

export const getCartItems = async () => {
  const session = await supabase.auth.getUser();
  const userId = session.data.user?.id;
  const products = [];

  const { data, error } = await supabase
    .from("cart")
    .select(
      ` id,
        userid,
        productid,
        quantity,
        total,
        status,
        product (
          id,
          name,
          price,
          image
        )
      `
    )
    .eq("userid", userId);

  return data;
};

export const getCheckedCartItems = async (userId: string | undefined) => {
  const { data, error } = await supabase
    .from("cart")
    .select(
      ` id,
        userid,
        productid,
        quantity,
        total,
        status,
        product (
          id,
          name,
          price,
          image
        )
      `
    )
    .eq("userid", userId)
    .eq("status", "checked");

  return data;
};

export const deleteCartItemById = async (id: number) => {
  const { data, error } = await supabase.from("cart").delete().eq("id", id);

  return { data, error };
};

export const updateCartStatusById = async (id: number, status: string) => {
  const { data, error } = await supabase
    .from("cart")
    .update({ status: status })
    .eq("id", id);

  return { data, error };
};
