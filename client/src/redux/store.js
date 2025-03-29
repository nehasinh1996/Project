import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import filterReducer from "./filterSlice";
import sortByReducer from "./sortby";
import wishlistReducer from "./wishlistSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice"; // ✅ Import authReducer
import searchReducer from "./searchSlice";
import categoryReducer from "./categorySlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    sortBy: sortByReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    auth: authReducer, // ✅ Add auth reducer
    search: searchReducer,
    category: categoryReducer,
  },
  devTools: import.meta.env.MODE !== "production",

});

export default store;
