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

export const alertActionSlice = createSlice({
  name: "alertAction",
  initialState: {
    enable: false,
    title: "",
    discription: "",
    callback: null,
  },
  reducers: {
    enableAlertAction: (state, { payload }) => {
      state.enable = true;
      state.title = payload.title;
      state.discription = payload.discription;
      state.callback = payload.callback;
    },
    confirmAlertAction: (state) => {
      state.enable = false;
      state.callback();
      state.callback = false;
    },
    cancelAlertAction: (state) => {
      state.enable = false;
      state.callback = null;
    },
  },
});

export const foreignerSlice = createSlice({
  name: "foreigner",
  initialState: {
    value: false,
  },
  reducers: {
    setForeigner: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const semesterSlice = createSlice({
  name: "semester",
  initialState: {
    value: 1,
  },
  reducers: {
    setSemester: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { enable, disable } = loaderSlice.actions;
export const { show, hide } = alertSlice.actions;
export const { enableAlertAction, confirmAlertAction, cancelAlertAction } =
  alertActionSlice.actions;
export const { setForeigner } = foreignerSlice.actions;
export const { setSemester } = semesterSlice.actions;
