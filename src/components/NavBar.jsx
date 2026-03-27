import { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-100 px-10 py-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-xl font-semibold tracking-tight text-white">
          insight
        </div>

        {/* Desktop Links */}
        <div
          className="hidden md:flex gap-8 text-sm text-gray-300
          backdrop-blur-xl
          bg-white/5
          border border-white/10
          rounded-full
          px-8 py-3
          shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        >
          <a href="#" className="hover:text-purple-400 transition">Home</a>
          <a href="#" className="hover:text-purple-400 transition">Features</a>
          <a href="#" className="hover:text-purple-400 transition">About Us</a>
          <a href="#" className="hover:text-purple-400 transition">Showcase</a>
        </div>

        {/* Desktop Button */}
        <button className="hidden md:block px-4 py-2 text-sm border border-purple-500/30 rounded-lg hover:bg-purple-500/10 hover:cursor-pointer transition text-white">
          Share
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <div className="space-y-1.5">
            {/* Animated Hamburger Lines */}
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu - Now with Smooth Transitions */}
      <div
        className={`md:hidden absolute top-full left-0 w-full mt-2 flex flex-col gap-4 text-sm text-gray-300
        backdrop-blur-xl
        bg-white/10
        border border-white/10
        rounded-2xl
        px-6 py-6
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        transition-all duration-300 ease-in-out origin-top
        ${isOpen 
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
          : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <a href="#" className="hover:text-purple-400 transition">Home</a>
        <a href="#" className="hover:text-purple-400 transition">Features</a>
        <a href="#" className="hover:text-purple-400 transition">About Us</a>
        <a href="#" className="hover:text-purple-400 transition">Showcase</a>

        <button className="mt-2 px-4 py-2 border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition text-white">
          Share
        </button>
      </div>
    </nav>
  );
}

export default NavBar;