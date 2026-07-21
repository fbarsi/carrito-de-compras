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
  modifyItem: (item: ItemProp) => void;
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
      modifyItem: (itemModified) =>
        set((state) => {
          const newItemList = state.items.map((item) => {
            if (item.id === itemModified.id) {
              return itemModified;
            }
            return item;
          });
          const newTotal = newItemList.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          );
          return {
            items: newItemList,
            total: newTotal,
          };
        }),
      removeItem: (itemRemoved) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemRemoved.id),
          total: Math.max(
            0,
            state.total - itemRemoved.price * itemRemoved.quantity,
          ),
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
