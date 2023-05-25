import React from "react";
import { Routes as AppRoutes, Route, Outlet } from "react-router-dom";
import Landing from "../pages/Landing";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Landing />} />
      </Route>
    </AppRoutes>
  );
};

export default Routes;
