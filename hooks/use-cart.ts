import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { DataItem } from "@/data/types";

interface CartStore {
  items: DataItem[];
  addToCart: (item: DataItem, qty: number) => void;
  removeFromCart: (id: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addToCart: (item: DataItem, qty: number) => {
        const currentItems = get().items;
        const itemExists = currentItems.some((i) => i.id === item.id);

        if (itemExists) {
          return toast("Item already in cart", { icon: "🛒" });
        }

        item.qty = qty;
        item.status = "checked";
        set({ items: [...get().items, item] });
        toast.success("Item added to cart", { icon: "🛒" });
      },
      removeFromCart: (id: number) => {
        set({ items: [...get().items.filter((i) => i.id !== id)] });
        toast.success("Item removed from cart", { icon: "🗑️" });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
