"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import Logo from "@/public/logo.jpg";
import LoginBtn from "@/components/auth/login-btn";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";

import Link from "next/link";
import { SearchBar } from "./searchBar";
import useCart from "@/hooks/use-cart";

interface NavbarProps {
  user: boolean;
}

const routeHomepage = () => {
  window.location.href = "/";
};

const Navbar = ({ user }: NavbarProps) => {
  const cart = useCart();

  return (
    <nav className="w-full h-24 bg-white drop-shadow-md fixed top-0 left-0 z-50">
      <div className="w-10/12 mx-auto h-full flex items-center justify-between ">
        <div onClick={routeHomepage} className="cursor-pointer">
          <Image
            src={Logo}
            width={150}
            height={150}
            alt="Logo"
            className="w-36"
          />
        </div>
        <SearchBar />
        <div className="flex items-center w-52 gap-x-10 justify-end">
          <Link href={"/cart"}>
            <Button
              variant={"secondary"}
              size={"sm"}
              className={"relative text-primary rounded-lg text-xl"}
              asChild>
              <div>
                <ShoppingCart />
                <span className="bg-primary rounded-lg py-0.5 px-2 ml-1.5 text-sm font-medium text-white">
                  {cart.items.length}
                </span>
              </div>
            </Button>
          </Link>

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
