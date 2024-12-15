"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllCategory } from "@/data/product";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { OnlineOrdersDataTable } from "./online-orders-data-table";
import { OnlineOrdersColumns } from "./online-orders-columns";

const orderItems = [
  {
    name: "Croissant",
    qty: 12,
    price: 250.0, // Price in LKR
    total: 3000.0, // 12 * 250.0
  },
  {
    name: "Baguette",
    qty: 8,
    price: 300.0, // Price in LKR
    total: 2400.0, // 8 * 300.0
  },
  {
    name: "Blueberry Muffin",
    qty: 10,
    price: 200.0, // Price in LKR
    total: 2000.0, // 10 * 200.0
  },
  {
    name: "Chocolate Cake",
    qty: 2,
    price: 2500.0, // Price in LKR
    total: 5000.0, // 2 * 2500.0
  },
  {
    name: "Cinnamon Roll",
    qty: 6,
    price: 350.0, // Price in LKR
    total: 2100.0, // 6 * 350.0
  },
];

const supabase = createClient();

const POS = () => {
  const [categories, setCategories] = useState<any[] | null>([]);
  const [products, setProducts] = useState<any[] | null>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const getAllCategory = async () => {
      let { data: category, error } = await supabase
        .from("category")
        .select("*");
      setCategories(category);
    };
    const getAllProducts = async () => {
      let { data: product, error } = await supabase
        .from("product")
        .select("id, name, price, qty");
      product?.sort((a, b) => a.name.localeCompare(b.name));
      setProducts(product);
    };
    const getAllOrders = async () => {
      let { data: order, error } = await supabase
        .from("order")
        .select(
          "id, userid, deliverydatetime, deliveryaddress, status, paymentmethod, orderitem(id, orderid, quantity, product(productid, name, price)), profiles(userid, name, phone)"
        );
      if (order) {
        setOrderItems(order);
      }
    };

    getAllCategory();
    getAllProducts();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full h-full bg-white">
      <Tabs defaultValue="pos" className="w-full h-screen">
        <TabsList className="h-14 max-h-14 rounded-none">
          <TabsTrigger value="pos">POS (F11)</TabsTrigger>
          <TabsTrigger value="online">Online Orders (F12)</TabsTrigger>
        </TabsList>
        <TabsContent value="pos" className="max-h-[90vh] focus:outline-none">
          <div className="w-full h-full grid grid-cols-2">
            <div className="w-full h-full px-2 grid grid-rows-[10%_80%_10%] border-r-2 border-input">
              <div className="w-full flex items-center justify-end gap-x-5 mb-2">
                <Button variant={"outline"}>Hold Order (F8)</Button>
                <Button variant={"outline"}>cancel Order (F9)</Button>
              </div>
              <div>
                <DataTable columns={columns} data={orderItems} />
              </div>
              <div className="w-full flex items-center justify-between px-10">
                <Button variant={"outline"} size={"icon"} className="w-36">
                  <div className="flex items-center gap-x-3">
                    <Printer size={20} />
                    <span>(F5)</span>
                  </div>
                </Button>
                <div className="flex items-center gap-x-5">
                  <Button variant={"secondary"}>Card Pay (F6)</Button>
                  <Button variant={"default"}>Pay (F7)</Button>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col items-center gap-y-3">
              <Input
                placeholder="(F1) Search for products..."
                className="w-11/12 border-primary focus:outline-none"
              />
              <Separator />
              <div className="w-11/12 grid grid-cols-4 gap-2">
                {isClient &&
                  categories?.map((category) => (
                    <div
                      key={category.id}
                      className="w-full py-1 border border-primary text-primary rounded-lg text-center cursor-pointer">
                      {category.name}
                    </div>
                  ))}
              </div>
              <div className="w-11/12 max-h-[63vh] grid grid-cols-4 gap-2 overflow-y-scroll">
                {isClient &&
                  products?.map((product) => (
                    <div
                      key={product.id}
                      className="w-full h-20 rounded-lg relative bg-primary flex items-center justify-center cursor-pointer">
                      <p className="text-white text-center text-sm px-2">
                        {product.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="online">
          <h2 className="text-xl font-semibold tracking-wide my-5 text-center">
            Online Orders
          </h2>
          <div className="w-11/12 mx-auto">
            <OnlineOrdersDataTable
              columns={OnlineOrdersColumns}
              data={orderItems}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default POS;
