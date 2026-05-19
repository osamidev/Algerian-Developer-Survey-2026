import { useAuth } from "../../Contexts/useAuth";
import Logo from "./../../components/Logo";
import CircularProgress from "./CircularProgress";
import User from "lucide-react/dist/esm/icons/user";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import { useState, useRef, useEffect } from "react";

function Header({ progress }) {
  const { user, logout } = useAuth();
  const avatar_image = user?.avatar_image;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
  }

  return (
    <header className="z-50 w-full py-6 md:px-8">
      <div className="flex w-full items-center justify-between px-4">
        <Logo />
        <div className="flex items-center space-x-4">
          {progress !== null && progress !== undefined && (
            <CircularProgress progress={progress} />
          )}
          {/* The dropdown container needs to wrap both the trigger and the menu */}
          <div className="relative" ref={dropdownRef}>
            {avatar_image ? (
              <img
                src={avatar_image}
                alt="User Avatar"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-10 w-10 cursor-pointer rounded-full object-cover transition-transform duration-200 hover:scale-105 active:scale-95"
              />
            ) : (
              <User
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-10 w-10 cursor-pointer rounded-full object-cover text-gray-500 transition-transform duration-200 hover:scale-105 active:scale-95"
              />
            )}

            {isDropdownOpen && (
              <div className="border-border-subtle bg-background-card absolute top-full right-0 z-50 mt-2 flex w-48 flex-col rounded-xl border p-1.5 shadow-xl sm:w-44">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            )}
          </div>{" "}
          {/* Target container closed */}
        </div>{" "}
        {/* Right-side flex container closed */}
      </div>{" "}
      {/* Main row container closed */}
    </header>
  );
}

export default Header;
