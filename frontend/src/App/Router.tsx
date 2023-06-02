import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Landing from "../pages/Landing";

// Components
import CreateCommunity from "pages/CreateCommunity";
import ListCampaigns from "pages/ListCampaigns";
import Roadmap from "pages/Roadmap/Roadmap";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Landing />} />
        <Route path="create-community" element={<CreateCommunity />} />
        <Route path="campaigns" element={<ListCampaigns />} />
        <Route path="roadmap" element={<Roadmap />} />
      </Route>
    </Routes>
  );
};

export default Router;
