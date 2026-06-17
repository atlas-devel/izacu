import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MyContext } from "../context/Context";
import { motion, AnimatePresence } from "framer-motion";
import Profile from "./Profile";
import { useLocation, useNavigate } from "react-router-dom";

const Navigations = () => {
  const { showSidebar, setshowSidebar, showSettings, setshowSettings } =
    useContext(MyContext);
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  // Simulated search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setIsSearching(true);
      // Simulate API call delay
      setTimeout(() => {
        // Replace with actual search logic/API call
        const mockResults = [
          { id: 1, title: "Dashboard", path: "/watch" },
          { id: 2, title: "Products", path: "/watch" },
          { id: 3, title: "Orders", path: "/watch" },
          { id: 4, title: "Customers", path: "/watch" },
        ].filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(mockResults);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  if (pathname.startsWith("/browse")) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-950  to-blue-950 text-white h-[10vh] w-full flex items-center shadow-lg border-b border-white/10">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8">
        {/* Sidebar Toggle */}
        <motion.span
          onClick={() => setshowSidebar((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:inline-flex text-xl text-gray-200 hover:text-white duration-300 items-center justify-center bg-white/5 hover:bg-white/10 cursor-pointer px-4 py-2 border border-white/20 rounded-lg backdrop-blur-sm"
        >
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: showSidebar ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            <IoIosArrowBack />
          </motion.span>
        </motion.span>

        {/* Search and Actions */}
        <div className="flex items-center max-md:justify-between gap-3 lg:gap-6 w-full md:w-auto px-2 md:px-0">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search everything..."
                className="w-full bg-[#162556] backdrop-blur-md border border-white/20 focus:border-violet-400  outline-none pl-10 pr-10 py-2.5 rounded-lg text-white placeholder-gray-300 transition-all duration-300"
              />
              <span className="absolute text-xl left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <LuSearch />
              </span>
              {searchQuery && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearSearch}
                  className="absolute text-lg right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white cursor-pointer"
                >
                  <IoClose />
                </motion.span>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-blue-950/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl overflow-hidden z-50"
                >
                  {isSearching ? (
                    <div className="px-4 py-3 text-gray-300">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <ul className="max-h-64 overflow-y-auto">
                      {searchResults.map((result) => {
                        return (
                          <li
                            key={result.id}
                            className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors duration-200 border-b border-white/10 last:border-b-0"
                          >
                            <a
                              href={result.path}
                              className="block text-gray-100 hover:text-white"
                            >
                              {result.title}
                            </a>
                            <span className="text-gray-500">
                              {result.description}
                            </span>
                          </li>
                        );
                      })}
                      {searchResults.length > 2 && (
                        <li
                          onClick={() => navigate("/browse-movies")}
                          className="py-3 text-center hover:bg-white/10 bg-black/20 cursor-pointer transition-colors duration-200 border-b border-white/10 last:border-b-0"
                        >
                          Load more
                        </li>
                      )}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-gray-400">
                      No results found
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Admin Login Icon */}
          <motion.span
            onClick={() => setshowSettings((prev) => !prev)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full cursor-pointer border-2 border-red-300/30 hover:border-red-700 transition-all duration-300 bg-white/10"
          >
            <IoIosNotificationsOutline className="text-xl md:text-2xl" />
          </motion.span>
        </div>
      </div>
      {/* Profile Dropdown */}
      {showSettings && <Profile />}
    </div>
  );
};

export default Navigations;
