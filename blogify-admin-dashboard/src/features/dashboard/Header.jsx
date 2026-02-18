import { useState } from "react";
import { Menu, Bell, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Header({ onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white shadow flex items-center  sticky top-0 z-50 justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-4"></div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative">
          <Bell />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <User />
            <span
              className="hidden md:flex items-center justify-center
  w-8 h-8 border rounded-full bg-gray-500 text-white"
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
              <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                Profile
              </button>
              <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
