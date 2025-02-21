import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Layout } from "./layout";

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map(({ component: Component, name, path, isPrivate }, k) => {
          return (
            <Route
              path={"/" + path}
              element={
                <Layout key={`${k}-${name}`} isPrivate>
                  <Component />
                </Layout>
              }
              key={`${k}-${name}`}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
