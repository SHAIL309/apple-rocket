import React from "react";
import { Navigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { getUserData } from "src/utils/helper";

interface LayoutProps {
  children: React.ReactNode;
  isPrivate: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isPrivate }) => {
  const userData = getUserData();

  // If the route is private but the user is not logged in (no userData), redirect to the home page
  if (isPrivate && !userData) {
    return <Navigate to="/home" />;
  }

  // If the route is public and the user is logged in (userData exists), redirect to a protected route (like /products)
  if (!isPrivate && userData) {
    return <Navigate to="/products" />;
  }

  return (
    <>
      <header style={{ height: "60px" }}>
        <Navbar isLoggedIn={!!userData} />
      </header>
      <main style={{ marginTop: "40px" }}>{children}</main>
    </>
  );
};

export default Layout;
