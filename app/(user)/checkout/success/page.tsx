"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import useCart from "@/hooks/use-cart";

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState<any>("");
  const cart = useCart();

  useEffect(() => {
    const selectedCartItems = cart.items.filter(
      (item) => item.status === "checked"
    );
    selectedCartItems.map((item) => {
      cart.removeFromCart(item.id);
    });
    // Extract the query parameter from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const orderIdFromUrl = queryParams.get("order_id");

    // Update the state
    setOrderId(orderIdFromUrl);
  }, []);

  return (
    <div className="container mx-auto max-w-2xl py-16 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Thank you for your purchase. Your order has been processed successfully.
      </p>
      <div className="space-y-4">
        <p className="font-semibold">Order Number: {orderId}</p>
        <p>An email confirmation has been sent to your email address.</p>
      </div>
      <div className="mt-12">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
