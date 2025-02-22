import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPayload, IUser } from "../../interfaces/auth";

export const userAuthAction = createAsyncThunk(
  "auth/action",
  (payload: IPayload<string>) => {
    const { data, cb } = payload;
    if (cb) {
      cb();
    }
    return data;
  }
);

export const userSignUp = createAsyncThunk(
  "auth/signup",
  (payload: IPayload<IUser>) => {
    const { data, cb } = payload;
    localStorage.setItem("user", JSON.stringify(data));
    userAuthAction({ data: "" });
    if (cb) {
      cb();
    }
    return data;
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  (payload: IPayload<IUser>) => {
    const { data, cb } = payload;
    localStorage.setItem("user", JSON.stringify(data));
    userAuthAction({ data: "" });
    if (cb) {
      cb();
    }
    return data;
  }
);
