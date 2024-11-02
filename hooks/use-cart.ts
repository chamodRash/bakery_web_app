import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { DataItem } from "@/data/types";

interface CartStore {
  //initializing the functions
  items: DataItem[];
  addToCart: (item: DataItem, qty: number) => void;
  checkItem: (id: number, oldStatus: string) => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
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
          return toast.error("Item already in cart");
        }

        item.qty = qty;
        item.status = "checked";
        set({ items: [...get().items, item] });
        toast.success("Item added to cart");
      },

      checkItem: (id: number, oldState: string) => {
        set({
          items: get().items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: oldState === "checked" ? "unchecked" : "checked",
                }
              : item
          ),
        });
        toast.success(
          `Item ${oldState === "checked" ? "checked" : "unchecked"}`
        );
      },

      incrementItem: (id: number) => {
        set({
          items: [
            ...get().items.map((item) =>
              item.id === id ? { ...item, qty: Number(item.qty) + 1 } : item
            ),
          ],
        });
      },
      decrementItem: (id: number) => {
        set({
          items: [
            ...get().items.map((item) =>
              item.id === id
                ? { ...item, qty: Math.max(Number(item.qty) - 1, 0) }
                : item
            ),
          ],
        });
      },

      removeFromCart: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart");
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
