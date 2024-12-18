"use server";

import * as z from "zod";
import { DataItem } from "@/data/types";
import { createClient } from "@/utils/supabase/server";
import { orderFormSchema } from "@/schemas";
import { generateOrderConfirmationCode } from "@/lib/tokens";
import { sendOrderSuccessMsg } from "@/lib/sendMsgs";
import md5 from "crypto-js/md5";

const supabase = createClient();

const generateHash = (
  merchantId: string,
  orderId: string,
  amount: number,
  currency: string,
  merchantSecret: string
) => {
  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  const amountFormatted = parseFloat(amount.toString())
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  return md5(merchantId + orderId + amountFormatted + currency + hashedSecret)
    .toString()
    .toUpperCase();
};

interface placeOrderProps {
  items: {
    product: DataItem;
    qty: number;
  }[];
  values: z.infer<typeof orderFormSchema>;
}

export const placeProductCashOrder = async ({
  items,
  values,
}: placeOrderProps) => {
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();
  const userId = user?.id;
  const otp = generateOrderConfirmationCode();
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  const { data, error } = await supabase
    .from("order")
    .insert([
      {
        userid: userId,
        total: total,
        status: "unpaid",
        deliverydatetime: values.date,
        paymentmethod: values.paymentMethod,
        ordernote: values.note,
        confirmationcode: otp,
        createdat: new Date(),
        order_type: "online",
      },
    ])
    .select();

  if (error) {
    return { error: "Something went wrong! Please try again later." };
  }

  const { data: orderItemData, error: orderItemError } = await supabase
    .from("orderitem")
    .insert([
      ...items.map((item) => ({
        orderid: data[0].id,
        productid: item.product.id,
        quantity: item.qty,
        total: item.product.price * item.qty,
        createdat: new Date(),
      })),
    ])
    .select();

  if (orderItemError) {
    return { error: "Something went wrong! Please try again later." };
  }

  // Update product quantities
  for (const item of items) {
    let { data: product, error } = await supabase
      .from("product")
      .select("qty")
      .eq("id", item.product.id)
      .single();

    let newQty = product?.qty - item.qty;

    if (newQty < 0) {
      newQty = 0;
    }

    const { data: updateProductQty, error: updateProductQtyError } =
      await supabase
        .from("product")
        .update({ qty: newQty })
        .eq("id", item.product.id);
  }

  const phone = "94" + values.phone.slice(1);

  await sendOrderSuccessMsg(phone, otp);
  return { success: "Order has been placed successfully!" };
};

export const placeProductCardOrder = async ({
  items,
  values,
}: placeOrderProps) => {
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();
  const userId = user?.id;
  const otp = generateOrderConfirmationCode();
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );
  console.log("total", total);

  const { data: orderData, error } = await supabase
    .from("order")
    .insert([
      {
        userid: userId,
        total: total,
        status: "unpaid",
        deliverydatetime: values.date,
        paymentmethod: values.paymentMethod,
        ordernote: values.note,
        confirmationcode: otp,
        order_type: "online",
        createdat: new Date(),
      },
    ])
    .select()
    .single();

  if (error) {
    return { error: "Something went wrong! Please try again later." };
  }
  const { data: orderItemData, error: orderItemError } = await supabase
    .from("orderitem")
    .insert([
      ...items.map((item) => ({
        orderid: orderData.id,
        productid: item.product.id,
        quantity: item.qty,
        total: item.product.price * item.qty,
        createdat: new Date(),
      })),
    ])
    .select();

  if (orderItemError) {
    return { error: "Something went wrong! Please try again later." };
  }

  const orderId = orderData.id;
  const amount = total;
  const currency = "LKR";
  const merchantId = process.env.PAYHERE_MERCHANT_ID!;
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET!;
  const hash = generateHash(
    merchantId,
    orderId,
    amount,
    currency,
    merchantSecret
  );

  return {
    redirectUrl: "https://sandbox.payhere.lk/pay/checkout",
    params: {
      merchant_id: merchantId,
      return_url: "https://bakery-web-app.vercel.app/order/",
      cancel_url: "https://bakery-web-app.vercel.app/order/",
      notify_url: "https://bakery-web-app.vercel.app/api/payhere/notify",
      order_id: orderId,
      items: "cart items",
      currency: currency,
      amount: amount,
      first_name: values.name.split(" ")[0],
      last_name: values.name.split(" ").slice(1).join(" "),
      email: "", // Replace with actual email
      phone: values.phone,
      address: "", // Replace with actual address
      city: "", // Replace with actual city
      country: "Sri Lanka",
      hash: hash,
    },
  };
};
