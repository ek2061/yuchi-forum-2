import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  form: { account: string; password: string };
  error: { account: string; password: string };
  pwdVis: boolean;
}

const initialState: StateType = {
  form: { account: "jackey0517", password: "yuchi123" },
  error: { account: "", password: "" },
  pwdVis: false,
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
    },
    togglePwdVis: (state) => {
      state.pwdVis = !state.pwdVis;
    },
  },
});

export const { setAccount, setPassword, resetForm, togglePwdVis } =
  loginSlice.actions;
