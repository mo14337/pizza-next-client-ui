import Header from "@/components/custom/header";
import React, { ReactNode } from "react";
import StoreProvider from "../StoreProvider";
import QueryProvider from "../QueryProvider";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryProvider>
        <StoreProvider>
          <Header />
          <main>{children}</main>
        </StoreProvider>
      </QueryProvider>
    </>
  );
};

export default layout;
