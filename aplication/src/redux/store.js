import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice, alertSlice, alertActionSlice } from "./slices";

export const store = configureStore({
  reducer: {
    loading: loaderSlice.reducer,
    alert: alertSlice.reducer,
    alertAction: alertActionSlice.reducer,
  },
});
