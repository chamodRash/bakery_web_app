import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getOrderById } from "@/data/order";
import { getUserByid } from "@/data/user";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, you would fetch the order data based on the ID
  const order = await getOrderById(Number(params?.id));
  const user = await getUserByid(order.userid);

  return (
    <div className="min-h-screen w-full">
      <Breadcrumb className="mt-5 ml-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/orders">Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>order #{order.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className="w-11/12 mx-auto py-5">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-base font-semibold mb-4 underline">
              Order Details
            </h2>
            <div className="text-sm space-y-2">
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentmethod}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdat).toLocaleString()}
              </p>
              <p>
                <strong>Pickup Date:</strong>{" "}
                {new Date(order.deliverydatetime).toLocaleString()}
              </p>
            </div>
            <h2 className="text-base font-semibold mt-8 mb-4 underline">
              Customer Details
            </h2>
            <div className="text-sm space-y-2">
              <p>
                <strong>Name:</strong> {user[0]?.name}
              </p>
              <p>
                <strong>Phone:</strong> {user[0]?.phone}
              </p>
              <p>
                <strong>Address:</strong> {user[0]?.address}
              </p>
            </div>
          </div>
          <div>
            <p className="text-base font-semibold mb-4">Order Items</p>
            <div className="space-y-4">
              {order.orderitem.map((item) => (
                <Link
                  href={`/product/${item.id}`}
                  key={item.id}
                  className="flex items-center space-x-4 hover:bg-accent rounded-md p-2 transition-colors">
                  <Image
                    width={100}
                    height={100}
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x Rs. {item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    Rs. {(item.quantity * item.product.price).toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-right border-t-2 pt-3">
              <p className="text-lg font-semibold">
                Total: Rs. {order.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" asChild>
            <Link href="/orders">Back to Orders</Link>
          </Button>
          {order.status === "To Pay" && (
            <>
              <Button variant="destructive">Delete Order</Button>
              <Button>Pay Now</Button>
            </>
          )}
          {order.status === "Picked" && <Button>Leave a Review</Button>}
        </div>
      </main>
    </div>
  );
}
