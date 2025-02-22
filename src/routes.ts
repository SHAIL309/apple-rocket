import { lazy } from "react";

const HomePage = lazy(() => import("./pages/home"));
const ProductsPage = lazy(() => import("./pages/products"));

export const routes = [
  { path: "/home", name: "Home", component: HomePage, isPrivate: false },

  {
    path: "/products",
    name: "Products",
    component: ProductsPage,
    isPrivate: true,
  },
];
