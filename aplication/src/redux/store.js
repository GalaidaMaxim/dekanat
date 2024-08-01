import { configureStore } from "@reduxjs/toolkit";
import {
  loaderSlice,
  alertSlice,
  alertActionSlice,
  foreignerSlice,
  semesterSlice,
  courseSlice,
  connectionSlice,
} from "./slices";

export const store = configureStore({
  reducer: {
    loading: loaderSlice.reducer,
    alert: alertSlice.reducer,
    alertAction: alertActionSlice.reducer,
    foreigner: foreignerSlice.reducer,
    semester: semesterSlice.reducer,
    course: courseSlice.reducer,
    connection: connectionSlice.reducer,
  },
});
