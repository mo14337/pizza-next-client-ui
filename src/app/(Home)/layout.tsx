import Header from "@/components/custom/header";
import React, { ReactNode } from "react";
import StoreProvider from "../StoreProvider";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <StoreProvider>
        <Header />
        <main>{children}</main>
      </StoreProvider>
    </>
  );
};

export default layout;
