import React from "react";
import { Routes as AppRoutes, Route, Outlet } from "react-router-dom";
import Landing from "../pages/Landing";

// Components
import CreateCommunity from "pages/CreateCommunity";
import ListCampaigns from "pages/ListCampaigns";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Landing />} />
        <Route path="create-community" element={<CreateCommunity />} />
        <Route path="open-campaigns" element={<ListCampaigns />} />
      </Route>
    </AppRoutes>
  );
};

export default Routes;
