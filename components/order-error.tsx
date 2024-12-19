"use client";

import Image from "next/image";
import { Button } from "./ui/button";

interface orderItemsProps {
  id: number;
  productid: number;
  quantity: number;
  total: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

interface OrderCancelProps {
  orders: orderItemsProps[];
}

const OrderCancel = ({ orders }: OrderCancelProps) => {
  return (
    <div className="w-1/2 bg-white rounded-xl drop-shadow-lg py-10 flex flex-col items-center gap-y-5">
      <div className="text-center space-y-3 text-red-700">
        <h1 className="text-xl font-bold uppercase">
          Your Order has been failed
        </h1>
        <p className="text-sm px-5">
          Please try again later! You can go to orders and Repay for this order
          again. If it didn&#39;t work then Please be kind of enough order this
          using cash payment.
        </p>
      </div>
      <div className="w-10/12 mx-auto my-5 flex flex-col items-center justify-center">
        <Image src={"/error_gif.gif"} alt="error" width={100} height={100} />
      </div>
      <Button className="bg-red-500">Go to Home</Button>
    </div>
  );
};

export default OrderCancel;
