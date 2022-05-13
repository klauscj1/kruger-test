import React from "react";
import { Navbar } from "../components/Navbar";

export const MainLayout = ({ children, pageTitle }) => {
  return (
    <div className="h-screen w-screen">
      <Navbar pageTitle={pageTitle} />
      <div className="px-4 w-full h-auto ">{children}</div>
    </div>
  );
};
