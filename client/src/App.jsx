import React, { Suspense, lazy } from "react";
import RenderAll from "./component/RenderAll";
import Context from "./context/Context";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import WatchPage from "./page/WatchPage";
import SearchPage from "./page/SearchPage";
import LoginAdmins from "./Admins/LoginAdmins";
const Dashboard = lazy(() => import("./Admins/Dashboard"));
const AdminLayout = lazy(() => import("./Admins/AdminLayout"));
const Genre = lazy(() => import("./Admins/Genre"));
const Translators = lazy(() => import("./Admins/Translators"));
const Movies = lazy(() => import("./Admins/Movies"));
const Comments = lazy(() => import("./Admins/Comments"));
const Profile = lazy(() => import("./Admins/Profile"));
import CategoryPage from "./page/CategoryPage";
import LoginAdmin from "./Admins/login/LoginAdmin";
import OTPverification from "./Admins/login/OTPverification";
import { Toaster } from "sonner";
import ProtectedRoute from "./component/Protected route/ProtectedRoute";
import FilterMovies from "./page/FilterMovies";

const App = () => {
  return (
    <div>
      <Context>
        <Suspense fallback={<div className="p-8 text-center text-white">Loading...</div>}>
          <Routes>
          {/* admin login */}
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route
            path="/admin/reset/password-default"
            element={<OTPverification />}
          />
          {/* Public Pages wrapped in RenderAll layout */}
          <Route element={<RenderAll />}>
            <Route index element={<HomePage />} />
            <Route path="/watch/:slug" element={<WatchPage />} />
            <Route path="/browse-movies" element={<SearchPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/movies" element={<FilterMovies />} />
            <Route path="/series" element={<CategoryPage />} />
          </Route>
          {/* Admin Pages wrapped in AdminLayout */}
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/genres" element={<Genre />} />
            <Route path="/admin/translators" element={<Translators />} />
            <Route path="/admin/movies" element={<Movies />} />
            <Route path="/admin/comments" element={<Comments />} />
            <Route path="/admin/profile" element={<Profile />} />
          </Route>
          </Routes>
        </Suspense>
      </Context>
      <Toaster />
    </div>
  );
};

export default App;
