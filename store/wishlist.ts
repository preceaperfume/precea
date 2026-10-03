"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  id: string;
  size: string;
};

type WishlistStore = {
  items: WishlistItem[];
  wishlist: string[]; // Array of product IDs for backwards compatibility
  globalSize: string; // "8 ml" | "12 ml" | "all"
  isOpen: boolean;

  setGlobalSize: (size: string) => void;
  isWished: (id: string) => boolean;
  getItemSize: (id: string) => string | undefined;
  toggleWishlist: (id: string, size?: string) => void;
  updateItemSize: (id: string, newSize: string) => void;
  removeFromWishlist: (id: string) => void;
  openWishlist: () => void;
  closeWishlist: () => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      globalSize: "all",
      isOpen: false,

      setGlobalSize: (size: string) => set({ globalSize: size }),

      isWished: (id: string) => {
        return get().items.some((item) => item.id === id);
      },

      getItemSize: (id: string) => {
        const found = get().items.find((item) => item.id === id);
        return found?.size;
      },

      toggleWishlist: (id: string, size?: string) =>
        set((state) => {
          const targetSize = size || (state.globalSize !== "all" ? state.globalSize : "8 ml");
          const existingIndex = state.items.findIndex((item) => item.id === id);
          let nextItems: WishlistItem[];

          if (existingIndex >= 0) {
            const currentItem = state.items[existingIndex];
            // If size is provided and differs, update the size instead of removing
            if (size && currentItem.size !== size) {
              nextItems = [...state.items];
              nextItems[existingIndex] = { id, size };
            } else {
              // Remove
              nextItems = state.items.filter((item) => item.id !== id);
            }
          } else {
            // Add with specified size
            nextItems = [...state.items, { id, size: targetSize }];
          }

          return {
            items: nextItems,
            wishlist: nextItems.map((item) => item.id)
          };
        }),

      updateItemSize: (id: string, newSize: string) =>
        set((state) => {
          const nextItems = state.items.map((item) =>
            item.id === id ? { ...item, size: newSize } : item
          );
          return {
            items: nextItems,
            wishlist: nextItems.map((item) => item.id)
          };
        }),

      removeFromWishlist: (id: string) =>
        set((state) => {
          const nextItems = state.items.filter((item) => item.id !== id);
          return {
            items: nextItems,
            wishlist: nextItems.map((item) => item.id)
          };
        }),

      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false })
    }),
    {
      name: "precea-wishlist",
      partialize: (state) => ({
        items: state.items,
        wishlist: state.wishlist,
        globalSize: state.globalSize
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Backward compatibility migration:
          if ((!state.items || state.items.length === 0) && Array.isArray(state.wishlist) && state.wishlist.length > 0) {
            state.items = state.wishlist.map((entry) => {
              if (typeof entry === "object" && entry !== null && "id" in entry) {
                return entry as WishlistItem;
              }
              return { id: String(entry), size: "8 ml" };
            });
          } else if (Array.isArray(state.items)) {
            state.items = state.items.map((item) => {
              if (typeof item === "string") return { id: item, size: "8 ml" };
              return item;
            });
          } else {
            state.items = [];
          }
          state.wishlist = state.items.map((item) => item.id);
        }
      }
    }
  )
);