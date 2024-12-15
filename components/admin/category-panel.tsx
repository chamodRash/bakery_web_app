"use client";

import { CategoryItem } from "@/data/types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddCategory from "./add-category";
import EditCategory from "./edit-category";

interface CategoryPanelProps {
  category: CategoryItem[];
  catSlug: string;
}

const CategoryPanel = ({ category, catSlug }: CategoryPanelProps) => {
  const router = useRouter();
  const [checkedCategory, setCheckedCategory] = useState<CategoryItem[]>([]);

  const deleteCheckedCategories = () => {
    // Delete categories
    console.log("Delete categories");
  };

  return (
    <div className="w-full h-[95vh] border-r border-gray-300 relative pr-5">
      <div className="w-full flex items-center justify-between">
        <h3 className="font-bold text-lg text-zinc-700">Categories</h3>
        <AddCategory>
          <Button variant={"outline"}>Add Category</Button>
        </AddCategory>
      </div>
      <div className="w-full mt-4 overflow-auto">
        <div className="w-full">
          {category.map((cat) => (
            <div
              key={cat.id}
              onClick={() => router.push(`/admin/products?catSlug=${cat.slug}`)}
              className={`w-full flex items-center justify-between font-normal py-2 cursor-pointer px-2 rounded-lg ${
                catSlug === cat.slug
                  ? "bg-secondary text-primary font-semibold"
                  : "bg-transparent text-black"
              }`}>
              <div className="flex gap-x-2 items-center">
                <Checkbox
                  onCheckedChange={(checked) => {
                    checked
                      ? setCheckedCategory([...checkedCategory, cat])
                      : setCheckedCategory(
                          checkedCategory.filter(
                            (selCat) => selCat.id !== cat.id
                          )
                        );
                  }}
                />
                <p>{cat.name}</p>
              </div>
              <ChevronsRight
                className={`${
                  catSlug === cat.slug ? "text-primary" : "text-black"
                } w-5 h-5`}
                size={16}
              />
            </div>
          ))}
        </div>
      </div>
      {checkedCategory && checkedCategory.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full flex items-center justify-around gap-x-2">
          {checkedCategory.length === 1 && (
            <EditCategory category={checkedCategory[0]}>
              <Button>Edit</Button>
            </EditCategory>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} className="w-full">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  selected catagories.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteCheckedCategories()}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};

export default CategoryPanel;
