"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProductBySlug } from "@/data/product";
import { DataItem } from "@/data/types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductCheckoutProps {
  params: {
    slug: string;
    qty: string;
  };
}

export default function ProductCheckoutPage({ params }: ProductCheckoutProps) {
  const productSlug = params.slug;
  const productQty = params.qty;
  console.log("slug", productSlug);

  const [product, setProduct] = useState<any>();

  useEffect(() => {
    const item = getProductBySlug(productSlug);
    setProduct(item);
  }, []);

  return (
    <div className="min-h-screen h-fit w-11/12 mx-auto py-16">
      <h1 className="text-center text-xl font-bold uppercase mb-10">
        Checkout
      </h1>
      {/* <Table>
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
            <TableCell className="text-right">Rs. {product.price}.00</TableCell>
            <TableCell className="text-center">{Number(productQty)}</TableCell>
            <TableCell className="text-right">
              Rs. {product.price * Number(productQty)}.00
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className="text-right text-base font-bold">
              Total
            </TableCell>
            <TableCell className="text-right font-bold border-double border-b-2">
              Rs. {product.price}
              .00
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table> */}
    </div>
  );
}

//   {/* <div className="w-full mt-10">
//     <p className="text-lg font-semibold text-center mb-5">Payment Method</p>
//     <RadioGroup defaultValue="cash-on-delivery">
//       <div className="w-full flex items-center space-x-2 pb-3">
//         <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
//         <Label
//           htmlFor="cash-on-delivery"
//           className="pl-4 flex items-center gap-x-3"
//         >
//           <Coins />
//           <p>Cash on Delivery</p>
//         </Label>
//       </div>
//       <Separator />
//       <Accordion type="single" className="w-full" collapsible>
//         <AccordionItem value="item-1" className="w-full">
//           <div className="w-full flex items-center gap-x-3">
//             <RadioGroupItem value="credit-card" id="credit-card" />
//             <AccordionTrigger>
//               <Label
//                 htmlFor="credit-card"
//                 className="pl-4 flex items-center gap-x-3"
//               >
//                 <CreditCard />
//                 <p>Card Payment</p>
//               </Label>
//             </AccordionTrigger>
//           </div>
//           <AccordionContent>
//             <div className="w-full pl-8 flex flex-col gap-y-5">
//               <div className="w-full flex gap-x-3 items-center">
//                 <Input
//                   type="text"
//                   placeholder="Card Number"
//                   className="w-5/12 border-2"
//                 />
//                 <Input
//                   type="text"
//                   placeholder="Name on Card"
//                   className="w-5/12 border-2"
//                 />
//               </div>
//               <div className="flex gap-x-3 items-center">
//                 <div className="w-36 flex items-center justify-between mr-5">
//                   <Input
//                     type="text"
//                     placeholder="MM"
//                     className="w-16 border-2"
//                   />
//                   <span className="mx-2">/</span>
//                   <Input
//                     type="text"
//                     placeholder="YY"
//                     className="w-16 border-2"
//                   />
//                 </div>
//                 <Input
//                   type="text"
//                   placeholder="CVV"
//                   className="w-40 border-2"
//                 />
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </RadioGroup>
//   </div> */}
