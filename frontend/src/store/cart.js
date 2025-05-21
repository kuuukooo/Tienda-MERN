import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const exists = state.items.find((i) => i.product._id === product._id);
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.product._id === product._id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product._id !== productId),
        })),
      updateQuantity: (productId, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product._id === productId ? { ...i, quantity: qty } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // clave en localStorage
      getStorage: () => localStorage,
    }
  )
);
