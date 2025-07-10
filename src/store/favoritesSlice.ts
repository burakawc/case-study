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
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (p) => p.id === action.payload.id
      );
      if (!existingProduct) {
        state.products.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
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
