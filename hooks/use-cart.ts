import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";
import { DataItem } from "@/data/types";

interface CartStore { //initializing the functions
  items: DataItem[];
  addToCart: (item: DataItem, qty: number) => void;
  checkItem:(id:number)=>void;
  incrementItem:(id:number)=>void;
  decrementItem:(id:number)=>void;
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
    
      checkItem: (id: number, newStatus: boolean) => {
        set({
          items: get().items.map(item => 
            item.id === id ? { ...item, status: newStatus } : item
          )
        });
        toast.success(`Item ${newStatus ? "checked" : "unchecked"}`, { icon: "☑" });
      },
      
      incrementItem: (id: number) => {
        set({items:[...get().items.map((item) =>item.id === id ? 
          { ...item, qty: item.qty + 1 } : item
          ),
        ]});
        toast.success("Item quantity increased", { icon: "➕" });
      },
      decrementItem: (id: number) => {
        set({items:[...get().items.map((item) =>item.id === id ? 
          { ...item, qty: Math.max(item.qty - 1, 0) } : item
          ),
        ]});
        toast.success("Item quantity increased", { icon: "➖" });
      },
      
      removeFromCart: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
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
