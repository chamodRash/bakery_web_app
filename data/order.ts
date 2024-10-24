"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export const getAllOrders = async () => {
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
