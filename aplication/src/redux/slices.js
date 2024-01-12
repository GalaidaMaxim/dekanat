import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    value: false,
  },
  reducers: {
    enable: (state) => {
      state.value = true;
    },
    disable: (state) => {
      state.value = false;
    },
  },
});

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    enable: false,
    text: "Hello",
    title: "World",
    type: "",
  },
  reducers: {
    show: (state, { payload }) => {
      state.enable = true;
      state.text = payload.text;
      state.title = payload.title;
      state.type = payload.type || "info";
    },
    hide: (state) => {
      state.enable = false;
    },
  },
});

export const { enable, disable } = loaderSlice.actions;
export const { show, hide } = alertSlice.actions;
