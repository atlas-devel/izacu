import { links } from "../../data/asset.js";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Sidebar({
  sidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  const [activeLink, setActiveLink] = useState("/");

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-30 bg-gray-900 border-r border-gray-800 transform transition-all duration-300
        md:relative md:translate-x-0 md:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${sidebarCollapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="flex flex-col h-full">
        <div
          className={`
          flex items-center justify-between border-b border-gray-800
          ${sidebarCollapsed ? "p-4" : "p-4"}
        `}
        >
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm">IZ</span>
              </div>
              <span className="text-white font-bold text-lg">Izacu</span>
            </div>
          )}
        </div>

        <nav
          className={`
          flex-1 space-y-1
          ${sidebarCollapsed ? "p-2" : "p-2"}
        `}
        >
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = activeLink === link.path;

            return (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setActiveLink(link.path)}
                className={`
                  flex items-center transition-colors duration-200 group relative
                  ${
                    isActive
                      ? "bg-gray-800 text-white border-l-2 border-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }
                  ${
                    sidebarCollapsed
                      ? "justify-center p-3 rounded"
                      : "space-x-3 px-3 py-3 rounded"
                  }
                `}
              >
                <Icon
                  className={`
                  flex-shrink-0
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  }
                  ${sidebarCollapsed ? "w-5 h-5" : "w-4 h-4"}
                `}
                />

                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border border-gray-700">
                    {link.name}
                  </div>
                )}

                {!sidebarCollapsed && (
                  <span className="font-medium text-sm">{link.name}</span>
                )}
              </a>
            );
          })}
        </nav>

        {sidebarCollapsed && (
          <div className="p-2 border-t border-gray-900">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="w-full flex items-center justify-center p-3 rounded hover:bg-gray-800 transition-colors"
            >
              <FiChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        )}

        {!sidebarCollapsed && (
          <div className="p-3 border-t border-gray-800">
            <div className="flex items-center space-x-3 p-2 rounded bg-gray-800">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xs">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
