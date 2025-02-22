import { createSlice } from "@reduxjs/toolkit";
import { userAuthAction, userLogin, userSignUp } from "../actions";
import { IUser } from "../../interfaces/auth";

export interface IAuthSlice {
  user: IUser | null;
  message: string;
  loading: boolean;
  error: string;
  authAction?: string;
  actionLoading?: boolean;
}

const initialState: IAuthSlice = {
  user: null,
  loading: false,
  error: "",
  message: "",
  authAction: "",
  actionLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("user");
      window.location.reload();
      return initialState;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    //user-action
    builder.addCase(userAuthAction.pending, (state) => {
      state.actionLoading = true;
    });
    builder.addCase(userAuthAction.fulfilled, (state, action) => {
      state.actionLoading = false;
      state.authAction = action.payload;
    });

    //user-signup
    builder.addCase(userSignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(userSignUp.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || "Something went wrong";
    });

    //user-login
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || "Something went wrong";
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
