import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  form: { account: string; password: string };
  error: { account: string; password: string };
  pwdVis: boolean;
  modalVis: boolean;
}

const initialState: StateType = {
  form: { account: "", password: "" },
  error: { account: "", password: "" },
  pwdVis: false,
  modalVis: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      const account = action.payload ?? "";
      state.form = { ...state.form, account };

      if (!account) {
        state.error = { ...state.error, account: "Account is required." };
      } else {
        state.error = { ...state.error, account: "" };
      }
    },
    setPassword: (state, action) => {
      const password = action.payload ?? "";
      state.form = { ...state.form, password };

      if (!password) {
        state.error = { ...state.error, password: "Password is required." };
      } else {
        state.error = { ...state.error, password: "" };
      }
    },
    resetForm: (state) => {
      state.form = initialState.form;
      state.error = initialState.error;
      state.modalVis = initialState.modalVis;
    },
    togglePwdVis: (state) => {
      state.pwdVis = !state.pwdVis;
    },
    openModal: (state) => {
      state.modalVis = true;
    },
    closeModal: (state) => {
      state.modalVis = false;
    },
  },
});

export const {
  setAccount,
  setPassword,
  resetForm,
  togglePwdVis,
  openModal,
  closeModal,
} = loginSlice.actions;
