"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";

import Logo from "@/public/logo.png";
import LoginBtn from "@/components/auth/login-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMenu } from "./user-menu";

import Link from "next/link";

interface NavbarProps {
  user: boolean;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className="w-full h-28 bg-secondary drop-shadow-md">
      <div className="w-10/12 mx-auto h-full flex items-center justify-between ">
        <Link href={"/"}>
          <Image src={Logo} width={70} height={70} alt="Logo" />
        </Link>
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
            }
            asChild>
            <Link href={"/cart"}>
              <ShoppingCart />
            </Link>
          </Button>

          {!user && (
            <LoginBtn asChild>
              <Button variant={"default"} size={"lg"}>
                Sign in
              </Button>
            </LoginBtn>
          )}
          {user && <UserMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
