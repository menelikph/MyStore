import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartState = {
  cart: Product[];
  favorites: Product[];

  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;

  toggleFavorite: (item: Product) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],

      addToCart: (item) => {
        const exists = get().cart.some((p) => p.id === item.id);

        if (!exists) {
          set({ cart: [...get().cart, item] });
        }
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((p) => p.id !== id),
        });
      },

      toggleFavorite: (item) => {
        const exists = get().favorites.some((p) => p.id === item.id);

        if (exists) {
          set({
            favorites: get().favorites.filter((p) => p.id !== item.id),
          });
        } else {
          set({ favorites: [...get().favorites, item] });
        }
      },
    }),
    {
      name: "shop-storage", //name of the storage ( must be unique )
    }
  )
);
