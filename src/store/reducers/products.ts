import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../actions";
import { DUMMY_DATA } from "src/constants/products";
import { IProduct } from "src/interfaces/products";

export interface IProductsSlice {
  products: IProduct[];
  product: any;
  message: string;
  fetchLoader: boolean;
  loading: boolean;
  error: string;
}

const initialState: IProductsSlice = {
  products: [],
  fetchLoader: false,
  product: null,
  loading: false,
  error: "",
  message: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    //get-products
    builder.addCase(getAllProducts.pending, (state) => {
      state.fetchLoader = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.fetchLoader = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.fetchLoader = false;
      state.error = action.error.message || "Something went wrong";
    });
    //get-product-details
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.error.message || "Something went wrong";
    });
    // update-product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const updatedList = (state.products || []).map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
      state.loading = false;
      state.products = updatedList;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    // delete-product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const updatedList = (state.products || []).filter(
        (i) => i.id !== action.payload.id
      );
      state.loading = false;
      state.products = updatedList;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default productsSlice.reducer;
