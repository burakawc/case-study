import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

interface FavoritesState {
  products: Product[];
}

const initialState: FavoritesState = {
  products: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    /**
     * Adds a product to favorites if it doesn't already exist
     * @param state - Current favorites state
     * @param action - Payload containing the product to add
     * @example
     * ```typescript
     * dispatch(addToFavorites(product));
     * ```
     */
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (p) => p.id === action.payload.id
      );
      if (!existingProduct) {
        state.products.push(action.payload);
      }
    },

    /**
     * Removes a product from favorites by its ID
     * @param state - Current favorites state
     * @param action - Payload containing the product ID to remove
     * @example
     * ```typescript
     * dispatch(removeFromFavorites(productId));
     * ```
     */
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    /**
     * Toggles a product's favorite status - adds if not present, removes if present
     * @param state - Current favorites state
     * @param action - Payload containing the product to toggle
     * @example
     * ```typescript
     * dispatch(toggleFavorite(product));
     * ```
     */
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.products.findIndex(
        (p) => p.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.products.splice(existingIndex, 1);
      } else {
        state.products.push(action.payload);
      }
    },

    /**
     * Clears all products from favorites
     * @param state - Current favorites state
     * @example
     * ```typescript
     * dispatch(clearFavorites());
     * ```
     */
    clearFavorites: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
