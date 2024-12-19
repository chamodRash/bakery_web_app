import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { parse } from "querystring"; // Node.js module to parse form data

export async function POST(req: Request) {
  const supabase = createClient();
  try {
    // Read the body as text and parse it as x-www-form-urlencoded
    const textBody = await req.text();
    const body = parse(textBody);

    const {
      order_id,
      payment_id,
      status_code,
      status_message,
      method,
      currency,
      amount,
    } = body;

    console.log("Notification received:", body);

    if (status_code === "2") {
      // Payment Success - Update order status in your database
      const { data, error } = await supabase
        .from("order")
        .update({ status: "paid" })
        .eq("id", order_id)
        .select("id, orderitem(id, productid, quantity)")
        .single();

      if (error) {
        console.error("Failed to update order status:", error.message);
        return NextResponse.json(
          { error: "Failed to update order status" },
          { status: 500 }
        );
      }

      const items = data.orderitem;

      // Update product quantities
      for (const item of items) {
        const { data: product, error: productError } = await supabase
          .from("product")
          .select("qty")
          .eq("id", item.productid)
          .single();

        if (productError) {
          console.error(
            "Failed to fetch product details:",
            productError.message
          );
          continue;
        }

        let newQty = product?.qty - item.quantity;
        newQty = Math.max(0, newQty); // Ensure quantity is not negative

        const { error: updateProductQtyError } = await supabase
          .from("product")
          .update({ qty: newQty })
          .eq("id", item.productid);

        if (updateProductQtyError) {
          console.error(
            "Failed to update product quantity:",
            updateProductQtyError.message
          );
        }
      }

      return NextResponse.json({ message: "Payment processed successfully" });
    } else {
      // Payment Failed - Log or handle failed payment
      console.error(
        `Payment failed for Order ID: ${order_id}, Message: ${status_message}`
      );
      return NextResponse.json({ error: status_message }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error processing payment notification:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
