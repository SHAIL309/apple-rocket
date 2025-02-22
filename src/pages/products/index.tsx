import React, { useEffect } from "react";
import { Products } from "../../modules/products";
import { useAppSelector, useStoreActions } from "src/store/hooks";
import { getAllProducts } from "src/store/actions";
import { Spin } from "antd";

const ProductsPage = () => {
  const action = useStoreActions({ getAllProducts });
  const { products, fetchLoader } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!(products || []).length) {
      action.getAllProducts();
    }
  }, []);

  return <>{fetchLoader ? <Spin fullscreen /> : <Products />}</>;
};

export default ProductsPage;
