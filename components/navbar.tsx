"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";

import Logo from "@/public/logo.jpg";
import LoginBtn from "@/components/auth/login-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMenu } from "./user-menu";

import Link from "next/link";
import { SearchBar } from "./searchBar";

interface NavbarProps {
  user: boolean;
}

const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className="w-full h-24 bg-white drop-shadow-md fixed top-0 left-0 z-50">
      <div className="w-10/12 mx-auto h-full flex items-center justify-between ">
        <Link href={"/"}>
          <Image
            src={Logo}
            width={150}
            height={150}
            alt="Logo"
            className="w-36"
          />
        </Link>
        <SearchBar />
        <div className="flex items-center w-52 gap-x-10 justify-end">
          <Button
            variant={"secondary"}
            size={"icon"}
            className={"text-primary rounded-lg text-xl"}
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
