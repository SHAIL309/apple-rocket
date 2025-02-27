import React from "react";
import classes from "./App.module.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Layout } from "./layout";
import NotFoundPage from "./pages/notFound";
import { loggedIn } from "./utils/helper";

function App() {
  const isLoggedIn = loggedIn();
  return (
    <div className={classes.app}>
      <Routes>
        {routes.map(({ component: Component, name, path, isPrivate }, k) => {
          return (
            <Route
              path={path}
              element={
                <Layout key={`${k}-${name}`} isPrivate={isPrivate}>
                  <Component />
                </Layout>
              }
              key={`${k}-${name}`}
            />
          );
        })}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/products" : "/home"} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
