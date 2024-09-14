"use client";

import React, { useEffect, useState }  from "react";
import { fetchCartItems } from '@/actions/cart';
import Image from "next/image";
import Link from "next/link";

import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge"


import { User } from "@supabase/supabase-js";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Logo from "@/public/logo.png";
import Bun from "@/public/bun.jpg";
import LoginBtn from "@/components/auth/login-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMenu } from "@/components/user-menu";
import {useRouter} from "next/navigation";

interface NavbarProps {
  user: User | null;
}


interface CartItem {
  id: number;
  productid:number;
  quantity: number;
  total: number;
  status:boolean
  product: {
    id:number;
    name:string;
    price:number;
  };  
}



const CartPage: React.FC<NavbarProps> = ({ user }) => {

    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    
  

    useEffect(() => {
      const fetchItems = async () => {
        try {
          const data = await fetchCartItems();
          console.log("Fetched data:", data); 
          setCartItems(data);
        } catch (err) {
          setError("Something went wrong");
        } finally {
          setLoading(false);
        }
      };
  
      fetchItems();
    }, []);


    const updateItemInCart = async (id: number, quantity: number, total: number) => {
      try {
        const response = await fetch(`/api/cart?id=${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity, total }),
        });
    
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to update item');
        }
    
        // Optionally update state or refetch cart items
        console.log('Item updated successfully');
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };
    
    const incrementItem = (index: number) => {
      setCartItems(prevItems => {
        const item = prevItems[index];
        const newQuantity = item.quantity + 1;
        const newTotal = newQuantity * item.product.price;
        
        const updatedItems = prevItems.map((item, idx) =>
          idx === index ? { ...item, quantity: newQuantity, total: newTotal } : item
        );
        
        updateItemInCart(prevItems[index].id, newQuantity, newTotal); // Update the database
        return updatedItems;
      });
    };
    
    const decrementItem = (index: number) => {
      setCartItems(prevItems => {
        const item = prevItems[index];
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : item.quantity;
        const newTotal = newQuantity * item.product.price;
        
        const updatedItems = prevItems.map((item, idx) =>
          idx === index ? { ...item, quantity: newQuantity, total: newTotal } : item
        );
        
        updateItemInCart(prevItems[index].id, newQuantity, newTotal); // Update the database
        return updatedItems;
      });
    };
    
    
   

      const deleteItems = async (id: number) => {
        try {
          const response = await fetch(`/api/cart?id=${id}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to delete item');
          }
      
          // Optionally update state or refetch cart items
          console.log('Item deleted successfully');
          setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      };

      const ButtonDestructive: React.FC<{ onClick: () => void }> = ({ onClick }) => (
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:bg-red-100"
          onClick={onClick}
        >
          <Trash />
        </Button>
      );
      
      

      const totalAmount=cartItems.reduce(
      (total,item)=>total+(item.product.price*item.quantity),0
      );

  const router = useRouter();

  const handleCartClick = () => {
    router.push("/userCart");
  };
  return (
    <nav className="w-full h-28 bg-secondary drop-shadow-md">
      <div className="w-10/12 mx-auto h-full flex items-center justify-between ">
        <Image src={Logo} width={70} height={70} alt="Logo" />
        <div className="flex items-center w-2/3 gap-x-10 justify-end">
          <form action="" className="relative flex items-center">
            <Input
              type="search"
              className="peer transition-all cursor-pointer z-10 h-12 w-12 rounded-full bg-transparent pl-5 outline-none border-primary focus:z-0 focus:border focus:w-[500px] focus:cursor-text focus:border-primary focus:pl-8 focus:pr-4"
            />
            <Button
              variant={"ghost"}
              size={"icon"}
              className={
                "absolute transition-all rounded-full text-base ml-3 font-bold text-[hsl(26,58%,23%)] peer-hover:bg-white peer-focus:right-2 peer-focus:text-white peer-focus:bg-primary"
              }>
              <Search />
            </Button>
          </form>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={
              "text-primary hover:bg-white hover:text-primary rounded-full text-xl"
            } onClick={handleCartClick}>
            <ShoppingCart />
          </Button>

          {!user && (
            <LoginBtn asChild>
              <Button variant={"default"} size={"lg"}>
                0778074151
              </Button>
            </LoginBtn>
          )}
          {user && <UserMenu />}
         
        </div>
         
      </div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0',fontSize:'2.5rem' }}>
      <u>  Your Cart</u>
      </h1>
      {
        cartItems.length===0 ?
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0',fontSize:'2.5rem' }}>
            Your Cart is Empty. Start Shopping!
        </h1>:null
      }
     
      <Table>
      
      <TableHeader>
        <TableRow>
          <TableHead>Select</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Actions</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.map((item,index) => (
          <TableRow key={item.productid}>
            <TableCell><input type="checkbox" checked={item.status} /></TableCell>
            <TableCell className="font-medium">{item.product.name}<Image src={Bun} width={35} height={35} alt="Bun" /></TableCell>
            <TableCell>{item.product.price}/=</TableCell>
            <TableCell className="p-2 flex items-center gap-x-2">
            <button
                      onClick={() => decrementItem(index)}
                      className="p-2 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementItem(index)}
                      className="p-2 border rounded"
                    >
                      +
                    </button>
                </TableCell>
            <TableCell>{item.product.price*item.quantity}/=</TableCell>
            <TableCell><ButtonDestructive onClick={() => deleteItems(item.id)} /></TableCell>
            
            
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      
        <TableRow>
          <TableCell colSpan={3}></TableCell>
          
          
          <TableCell 
           style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Total Amount</TableCell>
          <TableCell >{totalAmount}/=</TableCell>
        </TableRow>
        

      </TableFooter>
    </Table>
    <div className="flex justify-center mt-4">
  <Badge variant="green" className="text-lg px-4 py-2">
    <Link href="/checkout">Checkout</Link>
  </Badge>
</div>

    
    </nav>
    
  );
};

export default CartPage;
