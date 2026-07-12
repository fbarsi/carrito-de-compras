import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./mmkvAdapter";

export type ItemProp = {
  id: string;
  title: string;
  quantity: number;
  price: number;
};

type Cart = {
  items: ItemProp[];
  total: number;
  addItem: (item: ItemProp) => void;
  removeItem: (item: ItemProp) => void;
  clearCart: () => void;
};

export const useCartStore = create<Cart>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
          total: state.total + item.price * item.quantity,
        })),
      removeItem: (item) =>
        set((state) => ({
          items: state.items.filter((_item) => _item.id !== item.id),
          total: Math.max(0, state.total - item.price * item.quantity),
        })),
      clearCart: () =>
        set(() => ({
          items: [],
          total: 0,
        })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
