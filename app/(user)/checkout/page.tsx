"use server";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProductBySlug } from "@/data/product";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import CheckoutDetails from "@/components/checkout-details";
import CartCheckout from "@/components/cart-checkout";

interface contextProps {
  searchParams: {
    slug: string;
    qty: string;
    order_id: string;
    status: "success" | "cancel";
    type: string;
  };
  params: any;
}

export default async function ProductCheckoutPage(context: contextProps) {
  const supabase = createClient();
  const { slug, qty, type } = context.searchParams;

  if (slug !== undefined && qty !== undefined) {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    const product = await getProductBySlug(slug);
    const productArray = [{ product, qty: Number(qty) }];

    return (
      <div className="min-h-screen h-fit w-11/12 mx-auto py-16">
        <h1 className="text-center text-xl font-bold uppercase mb-10">
          Checkout
        </h1>
        <div className="w-full grid grid-cols-3 gap-x-10">
          <div className="col-span-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={product.id}>
                  <TableCell className="flex gap-x-3 items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="w-10 h-10 rounded-sm object-cover"
                    />
                    <p>{product.name}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    Rs. {product.price}.00
                  </TableCell>
                  <TableCell className="text-center">{Number(qty)}</TableCell>
                  <TableCell className="text-right">
                    Rs. {product.price * Number(qty)}.00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-right text-base font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold border-double border-b-2">
                    Rs. {product.price * Number(qty)}.00
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <CheckoutDetails
            type="product"
            items={productArray}
            name={user?.user_metadata.full_name}
            phone={user?.user_metadata.user_phone}
          />
        </div>
      </div>
    );
  }

  if (type !== undefined && type === "cart") {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    const fullName = user?.user_metadata.full_name;
    const phone = user?.user_metadata.user_phone;

    return <CartCheckout fullName={fullName} phone={phone} />;
  }
}
