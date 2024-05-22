import { useContext } from "react";
import { StoreContext } from "@/providers";

export const useStores = () => {
  return useContext(StoreContext);
};
