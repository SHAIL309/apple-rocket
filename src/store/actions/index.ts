import { useStoreActions } from "../hooks";

import * as authAction from "./auth";

export * from "./auth";

export const useActions = () => {
  return useStoreActions({ ...authAction });
};
