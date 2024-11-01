import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};
export const SearchBar = ({}: Props) => {
  return (
    <form className="w-1/2 mx-auto">
      <div className="flex">
        <div className="relative w-full">
          <Input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus-visible:ring-0"
            placeholder="Search..."
            required
          />
          <Button
            type="submit"
            size={"icon"}
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-r-lg rounded-l-none border border-primary ">
            <Search />
          </Button>
        </div>
      </div>
    </form>
  );
};
