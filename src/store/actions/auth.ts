import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPayload, IUser } from "../../modules/auth/interfaces/auth";

export const userSignUp = createAsyncThunk(
  "auth/signup",
  async (payload: IPayload<IUser>) => {
    const { data, cb } = payload;
    localStorage.setItem("user", `${data}`);
    if (cb) {
      cb();
    }
    return data;
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (payload: IPayload<IUser>) => {
    const { data, cb } = payload;
    localStorage.setItem("user", `${data}`);
    if (cb) {
      cb();
    }
    return data;
  }
);
