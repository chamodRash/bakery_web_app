import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";

import Logo from "@/public/logo.png";
import LoginBtn from "@/components/auth/login-btn";

const Navbar = () => {
  return (
    <nav className="w-full h-28 bg-[hsl(5,12%,83%)] drop-shadow-md">
      <div className="w-10/12 mx-auto h-full flex items-center justify-between ">
        <Image src={Logo} width={70} height={70} alt="Logo" />
        <div className="flex items-center w-2/3 gap-x-10 justify-end">
          <form action="" className="relative flex items-center">
            <input
              type="search"
              className="peer transition-all cursor-pointer z-10 h-12 w-12 rounded-full bg-transparent pl-5 outline-none border-[#5E3719] focus:z-0 focus:border focus:w-[500px] focus:cursor-text focus:border-[#5E3719] focus:pl-8 focus:pr-4"
            />
            <Button
              variant={"ghost"}
              size={"icon"}
              className={
                "absolute transition-all rounded-full text-base ml-3 font-bold text-[hsl(26,58%,23%)] peer-hover:bg-white peer-focus:right-2 peer-focus:text-white peer-focus:bg-[#5E3719]"
              }>
              <FaSearch />
            </Button>
          </form>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={
              "text-[#5E3719] hover:bg-white hover:text-[#5E3719] rounded-full text-xl"
            }>
            <HiShoppingCart />
          </Button>

          <LoginBtn>
            <Button variant={"default"} size={"lg"}>
              Sign in
            </Button>
          </LoginBtn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
