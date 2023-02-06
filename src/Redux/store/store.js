import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reducers/cart";
import hotel from "../reducers/hotel";
import user from "../reducers/user";
const store = configureStore({
  reducer: {
    cartStore: cartReducer,
    user: user,
    hotel: hotel
  }
});

export default store;
