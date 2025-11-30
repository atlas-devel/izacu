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
import Genre from "./Admins/Genre";
import Translators from "./Admins/Translators";
import Movies from "./Admins/Movies";
import Comments from "./Admins/Comments";
import Profile from "./Admins/Profile";
import CategoryPage from "./page/CategoryPage";

const App = () => {
  return (
    <div>
      <Context>
        <Routes>
          <Route path="/login" element={<LoginAdmins />} />
          {/* Public Pages wrapped in RenderAll layout */}
          <Route element={<RenderAll />}>
            <Route index element={<HomePage />} />
            <Route path="/watch/:slug" element={<WatchPage />} />
            <Route path="/browse-movies" element={<SearchPage />} />
            <Route path="/category" element={<CategoryPage />} />
          </Route>
          {/* Admin Pages wrapped in AdminLayout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/genres" element={<Genre />} />
            <Route path="/admin/translators" element={<Translators />} />
            <Route path="/admin/movies" element={<Movies />} />
            <Route path="/admin/comments" element={<Comments />} />
            <Route path="/admin/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Context>
    </div>
  );
};

export default App;
