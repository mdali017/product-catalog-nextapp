import { configureStore } from "@reduxjs/toolkit";
// import { baseApi } from "../baseApi/baseApi";
// import authReducer from "../features/auth/authSlice";
import authReducer from "@/redux/features/auth/authSlice";
import productReducer from "@/redux/features/product/productSlice";
import searchTermReducer from "@/redux/features/searchTerm/searchTermSlice"
import cartReducer from "@/redux/features/cart/cartSlice"
// import { productSlice } from "./features/product/productSlice";
import { baseApi } from "./baseApi/baseApi";
// import { authSlice } from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    product: productReducer,
    searchTerm: searchTermReducer,
    cart: cartReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
