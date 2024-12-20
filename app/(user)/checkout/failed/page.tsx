"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { payOrderAgain } from "@/actions/checkout";
import { ordersProps } from "@/data/types";
import { getOrderById } from "@/data/order";

export default function CheckoutFailedPage() {
  const [orderId, setOrderId] = useState<any>("");
  const [order, setOrder] = useState<ordersProps | null>(null);

  useEffect(() => {
    // Extract the query parameter from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const orderIdFromUrl = queryParams.get("order_id");

    // Update the state
    setOrderId(orderIdFromUrl);

    // Fetch the order details
    const fetchOrder = async () => {
      const order = await getOrderById(Number(orderIdFromUrl));
      setOrder(order);
    };

    fetchOrder();
  }, []);

  const handlePayNow = async (order: ordersProps) => {
    try {
      const result = await payOrderAgain(order);
      if (result?.redirectUrl) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = result.redirectUrl;

        Object.keys(result.params).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = result.params[key as keyof typeof result.params];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-16 text-center">
      <XCircle className="mx-auto h-16 w-16 text-red-500 mb-6" />
      <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
      <p className="text-lg text-gray-600 mb-8">
        We&#39;re sorry, but there was an issue processing your payment.
      </p>
      <div className="space-y-4">
        <p>Please check your payment details and try again.</p>
        <p>If the problem persists, please contact our customer support.</p>
      </div>
      <div className="mt-12 space-x-4">
        <Button
          asChild
          variant="outline"
          onClick={() => order && handlePayNow(order)}>
          Try Again
        </Button>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
