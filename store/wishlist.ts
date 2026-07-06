"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistStore = {
  wishlist: string[];
  isOpen: boolean;
  toggleWishlist: (id: string) => void;
  openWishlist: () => void;
  closeWishlist: () => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      wishlist: [],
      isOpen: false,
      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((itemId) => itemId !== id)
            : [...state.wishlist, id]
        })),
      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false })
    }),
    {
      name: "precea-wishlist",
      partialize: (state) => ({ wishlist: state.wishlist })
    }
  )
);