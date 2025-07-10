import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";

/**
 * Redux store configuration
 *
 * Combines all reducers and sets up the store
 */
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
