import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    value: false,
  },
  reducers: {
    enable: (state) => {
      state.valueFacultetSelector = true;
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

export const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    updated: false,
    dbConnected: false,
  },
  reducers: {
    setUpdated: (state, { payload }) => {
      state.updated = payload;
    },
    setDBConnected: (state, { payload }) => {
      state.dbConnected = payload;
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

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    value: "Всі",
  },
  reducers: {
    setStatus: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    value: "Всі",
  },
  reducers: {
    setCourse: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const facultetSlice = createSlice({
  name: "facultet",
  initialState: {
    value: "",
  },
  reducers: {
    setFacultet: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    sername: "",
    login: "",
    _id: "",
    premissions: "",
  },
  reducers: {
    setUser: (state, { payload }) => {
      state._id = payload._id;
      state.name = payload.name;
      state.sername = payload.name;
      state.premissions = payload.premissions;
    },
    resetUser: (state) => {
      state._id = "";
      state.login = "";
      state.sername = "";
      state.premissions = "";
      state.name = "";
    },
  },
});

export const remoteTypeSlice = createSlice({
  name: "remoteType",
  initialState: {
    value: "",
  },
  reducers: {
    setRemoteType: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const yearSlice = createSlice({
  name: "year",
  initialState: {
    value: "",
  },
  reducers: {
    setYear: (state, { payload }) => {
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
export const { setCourse } = courseSlice.actions;
export const { setUpdated, setDBConnected } = connectionSlice.actions;
export const { setUser, resetUser } = UserSlice.actions;
export const { setStatus } = statusSlice.actions;
export const { setFacultet } = facultetSlice.actions;
export const { setRemoteType } = remoteTypeSlice.actions;
export const { setYear } = yearSlice.actions;
