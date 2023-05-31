import React from "react";
import { Routes as AppRoutes, Route, Outlet } from "react-router-dom";
import Landing from "../pages/Landing";
import CreateCommunity from "../pages/CreateCommunity";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Landing />} />
        <Route path="signup" element={<CreateCommunity />} />
      </Route>
    </AppRoutes>
  );
};

export default Routes;
