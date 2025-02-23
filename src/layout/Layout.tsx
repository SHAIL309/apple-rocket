import React from "react";
import { Navigate } from "react-router-dom";
import { Header } from "src/components/Header";
import { loggedIn } from "src/utils/helper";

interface LayoutProps {
  children: React.ReactNode;
  isPrivate: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isPrivate }) => {
  const isLoggedIn = loggedIn();

  // If the route is private but the user is not logged in (no userData), redirect to the home page
  if (isPrivate && !isLoggedIn) {
    return <Navigate to="/home" />;
  }

  // If the route is public and the user is logged in (isLoggedIn exists), redirect to a protected route (like /products)
  if (!isPrivate && isLoggedIn) {
    return <Navigate to="/products" />;
  }

  return (
    <>
      <header style={{ height: "60px" }}>
        <Header isLoggedIn={!!isLoggedIn} />
      </header>
      <main style={{ marginTop: "40px" }}>{children}</main>
    </>
  );
};

export default Layout;
