"use client";

import { createContext } from "react";
import { NextUIProvider } from "@nextui-org/react";
import NiceModal from "@ebay/nice-modal-react";

import { RootStore } from "@/stores";

export const StoreContext = createContext(RootStore);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={RootStore}>
      <NextUIProvider>
        <NiceModal.Provider>{children} </NiceModal.Provider>
      </NextUIProvider>
    </StoreContext.Provider>
  );
}
