import { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background-main/60 border-b border-border-subtle/30">
      <div className="max-w-7xl mx-auto w-full px-10 py-6 flex justify-between items-center">

        {/* Logo */}
        <div className="text-xl font-semibold tracking-tight text-text-high">
          insight
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm text-text-medium backdrop-blur-xl bg-white/5 border border-border-subtle rounded-full px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
          <button onClick={() => scrollTo("Hero")} className="hover:text-brand-hover transition">Home</button>
          <button onClick={() => scrollTo("About")} className="hover:text-brand-hover transition">About</button>
          <button onClick={() => scrollTo("Us")} className="hover:text-brand-hover transition">Who We Are</button>
          <button onClick={() => scrollTo("Showcase")} className="hover:text-brand-hover transition">Showcase</button>
        </div>

        {/* Desktop Share Button */}
        <button
          onClick={handleShare}
          className="hidden md:block px-4 py-2 text-sm border border-brand-primary/30 rounded-lg hover:bg-brand-primary/10 hover:cursor-pointer transition text-text-high">
          Share
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-high focus:outline-none"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-text-high transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-text-high transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-text-high transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full mt-2 flex flex-col gap-4 text-sm text-text-medium
        backdrop-blur-xl bg-background-main/95 border border-border-subtle rounded-2xl px-6 py-6
        shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out origin-top
        ${isOpen
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <button onClick={() => scrollTo("Hero")} className="text-left hover:text-brand-hover transition">Home</button>
        <button onClick={() => scrollTo("About")} className="text-left hover:text-brand-hover transition">About</button>
        <button onClick={() => scrollTo("Us")} className="text-left hover:text-brand-hover transition">Who We Are</button>
        <button onClick={() => scrollTo("Showcase")} className="text-left hover:text-brand-hover transition">Showcase</button>

        <button
          onClick={handleShare}
          className="mt-2 px-4 py-2 border border-brand-primary/30 rounded-lg hover:bg-brand-primary/10 transition text-text-high">
          Share
        </button>
      </div>
    </nav>
  );
}

export default NavBar;