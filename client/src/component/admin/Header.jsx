import {
  FiMenu,
  FiSearch,
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    setProfileOpen(false);
  };

  const handleProfile = () => {
    console.log("Opening profile...");
    setProfileOpen(false);
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded hover:bg-gray-800 transition-colors"
          >
            <FiMenu className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded hover:bg-gray-800 transition-colors"
          >
            {sidebarCollapsed ? (
              <FiChevronRight className="w-4 h-4 text-gray-400" />
            ) : (
              <FiChevronLeft className="w-4 h-4 text-gray-400" />
            )}
          </button>

          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-white">Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div
            className={`
            relative transition-all duration-300
            ${sidebarCollapsed ? "w-40" : "w-56"}
          `}
          >
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-3 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-gray-500 text-white placeholder-gray-400 w-full text-sm"
            />
            <FiSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <button className="relative p-2 rounded hover:bg-gray-800 transition-colors">
            <FiBell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-1 rounded hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xs">A</span>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1d] border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-gray-400">admin@example.com</p>
                </div>

                <div className="p-1">
                  <Link
                    to="/admin/profile"
                    onClick={handleProfile}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded transition-colors"
                  >
                    <FiUser className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </div>

                <div className="p-1 border-t border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-red-400 hover:bg-gray-800 rounded transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
