"use server";

import { createClient } from "@/utils/supabase/server";
import { ordersProps } from "./types";

export const getAllOrders = async () => {
  const supabase = createClient();
  try {
    let { data: orders, error } = await supabase
      .from("order")
      .select(
        "id, userid, total, status, deliverydatetime, deliveryaddress, paymentmethod, createdat, updatedat, ordernotes, confirmationcode, order_type, orderitem(id, productid, quantity, total)"
      );

    if (error) {
      return error;
    }

    return orders;
  } catch (error) {
    return error;
  }
};

export const getAllOrdersByUserID = async (
  id: number
): Promise<ordersProps> => {
  const supabase = createClient();
  let { data: orders, error } = await supabase
    .from("order")
    .select(
      "id, userid, total, status, deliverydatetime, deliveryaddress, paymentmethod, createdat, updatedat, ordernotes, confirmationcode, order_type, orderitem(id, productid, quantity, total, product(id, name, price, image))"
    )
    .eq("userid", id);

  return orders as unknown as ordersProps;
};

export const getOrderById = async (
  id: number | undefined
): Promise<ordersProps> => {
  const supabase = createClient();

  let { data: order, error } = await supabase
    .from("order")
    .select(
      "id, total, status, deliverydatetime, deliveryaddress, paymentmethod, order_type, orderitem(id, productid, quantity, total, product(id, name, price, image))"
    )
    .eq("id", id)
    .single();

  return order as unknown as ordersProps;
};

export const getAllOrdersByDateRange = async ({ from, to }: any) => {
  const supabase = createClient();
  try {
    let { data: orders, error } = await supabase
      .from("order")
      .select("id, total, order_type, createdat")
      .gte("createdat", from)
      .lte("createdat", to);

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
      "id, total, status, deliverydatetime, deliveryaddress, paymentmethod, orderitem(id, productid, quantity, total, product(id, name, price, image))"
    )
    .eq("userid", id);

  return orders as unknown as ordersProps[];
};

export const getTrendingProducts = async ({ from, to }: any) => {
  const supabase = createClient();
  try {
    let { data: orders, error } = await supabase
      .from("orderitem")
      .select("productid, product(id, name), quantity")
      .gte("createdat", from)
      .lte("createdat", to)
      .order("quantity", { ascending: false });

    if (error) {
      return error;
    }

    return orders;
  } catch (error) {
    return error;
  }
};
