"use server"

import * as z from "zod";
import { DataItem } from "@/data/types";
import { createClient } from "@/utils/supabase/server"
import { orderFormSchema } from "@/schemas";
import { generateOrderConfirmationCode } from "@/lib/tokens";
import { sendOrderSuccessMsg } from "@/lib/sendMsgs";

const supabase = createClient();

export const placeProductCashOrder = async (product: DataItem, qty: number, values: z.infer<typeof orderFormSchema>) => {
    const {data: { user }, error: sessionError } = await supabase.auth.getUser();
    const userId = user?.id;
    const otp = generateOrderConfirmationCode();
    
    try {
        const { data, error } = await supabase
            .from('order')
            .insert([
            { userid: userId, total: product.price*qty, status: "unpaid", deliverydatetime: values.date, paymentmethod: values.paymentMethod, ordernote: values.note, confirmationcode: otp, createdat: new Date() },
            ])
            .select()

        if (error) {
            return {error: "Something went wrong! Please try again later."}
        }
        
        const { data: orderItemData, error: orderItemError } = await supabase
            .from('orderitem')
            .insert([
            { orderid: data[0].id, productid: product.id, quantity: qty, total: product.price*qty, createdat: new Date() },
            ])
            .select()

        if (orderItemError) {
            return {error: "Something went wrong! Please try again later."}
        }

        const phone = "94" + values.phone.slice(1)

        const msgSent = await sendOrderSuccessMsg(phone, otp)

        if (!msgSent.sent) {
            return { error: "Failed to send OTP. Try Login again" };
          }

        return {success: "Order has been placed successfully!"}
    } catch (error) {
        return {error: "Something went wrong! Please try again later."}
    }

}