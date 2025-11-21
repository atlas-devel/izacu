import React from "react";
import RenderAll from "./component/RenderAll";
import Context from "./context/Context";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import WatchPage from "./page/WatchPage";
import SearchPage from "./page/SearchPage";
import LoginAdmins from "./Admins/LoginAdmins";
import Dashboard from "./Admins/Dashboard";
import AdminLayout from "./Admins/AdminLayout";

const App = () => {
  return (
    <div>
      <Context>
        <Routes>
          {/* Public Pages wrapped in RenderAll layout */}
          <Route element={<RenderAll />}>
            <Route index element={<HomePage />} />
            <Route path="/watch" element={<WatchPage />} />
            <Route path="/browse-movies" element={<SearchPage />} />
          </Route>

          {/* Admin Pages wrapped in AdminLayout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/login" element={<LoginAdmins />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Context>
    </div>
  );
};

export default App;
