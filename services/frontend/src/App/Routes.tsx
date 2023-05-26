import React from "react";
import { Routes as AppRoutes, Route, Outlet } from "react-router-dom";
import Landing from "../pages/Landing";
import Singup from "../pages/Signup";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Landing />} />
        <Route path="signup" element={<Singup />} />
      </Route>
    </AppRoutes>
  );
};

export default Routes;
