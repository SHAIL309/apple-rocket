import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignUp } from "../actions";
import { IUser } from "../../modules/auth/interfaces/auth";

export interface IAuthSlice {
  user: IUser | null;
  message: string;
  loading: boolean;
  error: string;
}

const initialState: IAuthSlice = {
  user: null,
  loading: false,
  error: "",
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("user");
      return initialState;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
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
