"use server";

import { createClient } from "@/utils/supabase/server";
import { ordersProps } from "./types";

export const getAllOrders = async () => {
  const supabase = createClient();
  try {
    let { data: orders, error } = await supabase
      .from("order")
      .select(
        "id, total, status, deliverydatetime, deliveryaddress, paymentmethod, orderitem(id, productid, quantity, total)"
      );

    if (error) {
      return error;
    }

    return orders;
  } catch (error) {
    return error;
  }
};

export const getOrdersByUserId = async (
  id: string | undefined
): Promise<ordersProps[]> => {
  const supabase = createClient();

  let { data: orders, error } = await supabase
    .from("order")
    .select(
      "id, total, status, deliverydatetime, deliveryaddress, paymentmethod, orderitem(id, productid, quantity, total)"
    )
    .eq("userid", id);

  return orders as ordersProps[];
};
