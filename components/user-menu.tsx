import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut } from "lucide-react";
import { CakeSlice } from "lucide-react";
import { UserRoundSearch } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Logs } from "lucide-react";
import LogoutBtn from "./auth/logout-btn";

type Props = {};
export const UserMenu = ({}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>
            <CakeSlice size={20} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-x-3 items-center text-gray-600 cursor-pointer hover:text-primary hover:font-semibold transition hover:bg-secondary">
          <UserRoundSearch size={16} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-x-3 items-center text-gray-600 cursor-pointer hover:text-primary hover:font-semibold transition hover:bg-secondary">
          <ShoppingCart size={16} />
          Cart
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-x-3 items-center text-gray-600 cursor-pointer hover:text-primary hover:font-semibold transition hover:bg-secondary">
          <Logs size={16} />
          Orders
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutBtn>
          <DropdownMenuItem className="flex gap-x-3 items-center text-gray-600 cursor-pointer hover:text-primary hover:font-semibold transition hover:bg-secondary">
            <LogOut size={16} />
            Logout
          </DropdownMenuItem>
        </LogoutBtn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
