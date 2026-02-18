import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Lock,
  Unlock,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
} from "lucide-react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [locked, setLocked] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    if (!locked) setCollapsed(!collapsed);
  };

  const toggleLock = () => {
    setLocked(!locked);
    setCollapsed(false);
  };

  const sideLinks = [
    { to: "", label: "Dashboard", icon: LayoutDashboard },
    { to: "blogs", label: "Blogs", icon: FileText },
    { to: "users", label: "Users", icon: Users },
    { to: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`bg-black text-white h-screen sticky top-0  transition-all duration-300
      ${collapsed ? "w-16" : "w-64"} flex flex-col`}
    >
      {/* Top */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-xl font-bold tracking-wide">Blogify</h1>
        )}

        <div className="flex gap-2">
          <button onClick={toggleSidebar}>
            <Menu size={18} />
          </button>

          <button onClick={toggleLock}>
            {locked ? <Lock size={18} /> : <Unlock size={18} />}
          </button>
        </div>
      </div>

      {/* Links */}
      <nav className="flex-1 p-3 space-y-2">
        {sideLinks.map((link, i) => {
          const Icon = link.icon;

          const active =
            location.pathname === `/dashboard/${link.to}` ||
            (link.to === "" && location.pathname === "/dashboard");

          return (
            <Link
              key={i}
              to={link.to}
              title={collapsed ? link.label : ""}
              className={`flex items-center gap-3 px-3 py-2 rounded transition
              ${active ? "bg-gray-700" : "hover:bg-gray-800"}`}
            >
              <Icon size={18} />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-gray-700">
        <button className="w-full bg-red-600 py-2 rounded hover:bg-red-700">
          {collapsed ? "⎋" : "Logout"}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
