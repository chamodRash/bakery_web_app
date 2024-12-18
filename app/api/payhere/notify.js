import { supabase } from "@/utils/supabaseClient"; // Example supabase setup

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      order_id,
      payment_id,
      status_code,
      status_message,
      method,
      currency,
      amount,
    } = req.body;

    if (status_code === "2") {
      // Payment Success - Update order status in your database
      const { data, error } = await supabase
        .from("order")
        .update({ status: "paid", paymentmethod: method, amount: amount })
        .eq("id", order_id)
        .select("id, orderitem(id, productid)")
        .single();
      const items = data.orderitem;

      if (error) {
        return res.status(500).json({ error: "Failed to update order status" });
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

      return res
        .status(200)
        .json({ message: "Payment processed successfully" });
    } else {
      // Payment Failed - Log or handle failed payment
      console.error(`Payment failed for Order ID: ${order_id}`);
      return res.status(400).json({ error: status_message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
