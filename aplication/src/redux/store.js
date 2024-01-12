import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice, alertSlice } from "./slices";

export const store = configureStore({
  reducer: {
    loading: loaderSlice.reducer,
    alert: alertSlice.reducer,
  },
});
