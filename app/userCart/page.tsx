"use client";

import React from "react";
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

interface CartItem{
    id:number;
    name:string;
    
    unitPrice:number;
    quantity:number;
    


}

const CartPage: React.FC<NavbarProps> = ({ user }) => {

    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);


    const tempCartItems:CartItem[]=[
        {
            id:1,
            name:'Dotted Bun',
           
            unitPrice:100,
            quantity:1,
            
        },
        {
            id:2,
            name:'Dotted Bun',
            
            unitPrice:200,
            quantity:2,
        },
        {
            id:3,
            name:'Dotted Bun',
        
            unitPrice:150,
            quantity:3,
        },

        
    ]
    React.useEffect(() => {
        setCartItems(tempCartItems)
    }, []);


    const incrementItem = (index: number) => {
        setCartItems(prevItems =>
          prevItems.map((item, idx) =>
            idx === index ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      };
    
      const decrementItem = (index: number) => {
        setCartItems(prevItems =>
          prevItems.map((item, idx) =>
            idx === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      };
    const deleteItem = (index: number) => {
        setCartItems(prevItems => prevItems.filter((_, idx) => idx !== index));
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
      (total,item)=>total+(item.unitPrice*item.quantity),0
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
          <TableRow key={item.id}>
            <TableCell><input type="checkbox" /></TableCell>
            <TableCell className="font-medium">{item.name}<Image src={Bun} width={35} height={35} alt="Bun" /></TableCell>
            <TableCell>{item.unitPrice}/=</TableCell>
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
            <TableCell>{item.unitPrice*item.quantity}/=</TableCell>
            <TableCell><ButtonDestructive onClick={() => deleteItem(index)} /></TableCell>
            
            
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
    <Link href="/checkout">Proceed to Payment</Link>
  </Badge>
</div>

    
    </nav>
    
  );
};

export default CartPage;
