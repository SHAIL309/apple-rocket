import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Navbar } from "../components/navbar";

// Utility to get user data (for demo purposes)
const getUserData = () => {
  return JSON.parse(localStorage.getItem("user") || "null"); // Assuming user data is stored as a JSON object
};

interface LayoutProps {
  children: React.ReactNode;
  isPrivate: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isPrivate }) => {
  const location = useLocation();
  const [userData, setUserData] = useState<any>(null); // For storing user data

  useEffect(() => {
    // Get user data from localStorage on initial render
    const data = getUserData();
    setUserData(data);
  }, []);

  // If the route is private but the user is not logged in (no userData), redirect to the home page
  if (isPrivate && !userData) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // If the route is public and the user is logged in (userData exists), redirect to a protected route (like /products)
  if (!isPrivate && userData) {
    return <Navigate to="/products" />;
  }

  return (
    <>
      <header style={{ height: "20%" }}>
        <Navbar isLoggedIn={!!userData} />
      </header>
      <main style={{ height: "80%" }}>{children}</main>
    </>
  );
};

export default Layout;
