import { useStoreActions } from "../hooks";

import * as authAction from "./auth";
import * as productsAction from "./products";

export * from "./auth";
export * from "./products";

export const useActions = () => {
  return useStoreActions({ ...authAction, ...productsAction });
};
