import React from "react";
import { useLocation, Navigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  isPrivate: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isPrivate }) => {
  const token = false; // Check if the user is authenticated
  const location = useLocation(); // To track the current route (for redirection)

  // If the route is private but the user is not logged in, redirect to login page
  if (isPrivate && !token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If the route is public and the user is logged in, redirect to a protected route (like /dashboard)
  if (!isPrivate && token) {
    return <Navigate to="/dashboard" />;
  }

  const getNavbar = () => {
    if (token) {
      return <NavbarLoggedIn />;
    }
    return <NavbarGuest />;
  };

  return (
    <div className="layout">
      <header>{getNavbar()}</header>
      <main>{children}</main>
    </div>
  );
};

// Navbar components for logged in and guest states

const NavbarLoggedIn: React.FC = () => (
  <nav>
    <ul>
      <li>
        <a href="/">NavbarLoggedIn</a>
      </li>
    </ul>
  </nav>
);

const NavbarGuest: React.FC = () => (
  <nav>
    <ul>
      <li>
        <a href="/">NavbarGuest</a>
      </li>
    </ul>
  </nav>
);

export default Layout;
