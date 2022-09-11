import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { authRoutes, publicRoutes } from "../routes";
import NotFound from "../pages/NotFound";
import { Context } from "../index";

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth === true &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
