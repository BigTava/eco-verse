import React from "react";
import { Routes as AppRoutes, Route, Outlet } from "react-router-dom";
import SubmitProposal from "../pages/SubmitProposal/SubmitProposal";
import Proposals from "../pages/Proposals/Proposals";
import TemplatePage from "../pages/TemplatePage/TemplatePage";
import Landing from "../pages/Landing";
import Signup from "src/pages/Signup";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Landing />} />
        <Route path="proposals" element={<Proposals />} />
        <Route path="signup" element={<Signup />} />
        <Route path="submitProposal" element={<SubmitProposal />} />
        <Route path="test" element={<TemplatePage />} />
      </Route>
    </AppRoutes>
  );
};

export default Routes;
