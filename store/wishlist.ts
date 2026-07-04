"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistStore = {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      wishlist: [],
      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((itemId) => itemId !== id)
            : [...state.wishlist, id]
        }))
    }),
    {
      name: "oscii-wishlist"
    }
  )
);