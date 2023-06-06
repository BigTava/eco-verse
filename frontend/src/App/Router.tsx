import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Landing from "../pages/Landing";

// Components
import ProtectedRoute from "components/ProtectedRoute";
import Prefecth from "components/Prefetch";

// Pages
import NewCommunity from "pages/NewCommunity";
import ListCampaigns from "pages/ListCampaigns";
import Roadmap from "pages/Roadmap/Roadmap";
import Dashboard from "pages/Dashboard";
import ListMembers from "pages/ListMembers";
import NewMember from "pages/NewMember";
import ListProposals from "pages/ListProposals";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Landing />} />
        <Route path="create-community" element={<NewCommunity />} />
        <Route path="campaigns" element={<ListCampaigns />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Prefecth />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<ListMembers />} />
            <Route path="new-member" element={<NewMember />} />
            <Route path="crowdloans" element={<ListCampaigns />} />
            <Route path="governance" element={<ListProposals />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
