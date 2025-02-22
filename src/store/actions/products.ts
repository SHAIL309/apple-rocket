import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "src/api/api";
import { IPayload } from "src/interfaces/auth";
import { IProduct } from "src/interfaces/products";

export const getAllProducts = createAsyncThunk(
  "products/all",
  async (cb?: () => void) => {
    const resp = await fetchApi({ method: "GET", url: "" });
    if (cb) {
      cb();
    }
    return resp as IProduct[];
  }
);

export const getProductById = createAsyncThunk(
  "products/id",
  async (payload: IPayload<number>) => {
    const { data, cb } = payload;
    const resp = await fetchApi({ method: "GET", url: `/${data}` });
    if (cb) {
      cb();
    }
    return resp as IProduct;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (payload: IPayload<IProduct>) => {
    const { data, cb } = payload;
    // const { title, price, description, category, ...rest } = data;
    const resp = await fetchApi({
      method: "PUT",
      url: `/${data.id}`,
      body: data,
    });
    if (cb && !!resp) {
      cb();
    }
    console.log("Updated Product detail: ", resp);
    return { ...data, ...(resp as IProduct) };
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (payload: IPayload<number>) => {
    const { data, cb } = payload;
    const resp = await fetchApi({ method: "DELETE", url: `/${data}` });
    if (cb && !!resp) {
      cb();
    }
    console.log("Deleted Product detail: ", resp);
    return resp as IProduct;
  }
);
