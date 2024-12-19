"use server";

import { MyProfile } from "@/components/my-profile";
import OrdersPageSection from "@/components/orders-page-section";
import { Button } from "@/components/ui/button";
import { getOrdersByUserId } from "@/data/order";
import { getUserByid } from "@/data/user";
import { createClient } from "@/utils/supabase/server";

const OrdersPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  const orders = await getOrdersByUserId(user?.id);

  return (
    <div className="w-11/12 mt-10 mx-auto h-screen">
      <h2 className="text-2xl font-bold text-primary mt-16 mb-10 text-center">
        My Orders
      </h2>
      <div className="w-10/12 mx-auto">
        <OrdersPageSection orders={orders} />
      </div>
    </div>
  );
};

export default OrdersPage;
