import { create } from "zustand";

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
  clearCart: () => void;
};

export const useCartStore = create<Cart>((set) => ({
  items: [],
  total: 0,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
      total: state.total + (item.price * item.quantity),
    })),
  clearCart: () => set(() => ({ items: [], total: 0 })),
}));
