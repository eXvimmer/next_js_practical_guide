import React from "react";
import MainNavigation from "./main-navigation";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;
