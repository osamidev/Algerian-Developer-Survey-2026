import { useState } from "react";
import Logo from "./Logo";
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
    <nav className="bg-background-main/60 border-border-subtle/30 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-4 relative">
        <Logo />

        {/* Desktop Links */}
        <div className="text-text-medium border-border-subtle hidden gap-8 rounded-full border bg-white/5 px-8 py-3 text-sm shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl md:flex absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => scrollTo("Hero")}
            className="hover:text-brand-hover transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo("About")}
            className="hover:text-brand-hover transition"
          >
            About
          </button>
          <button
            onClick={() => scrollTo("Us")}
            className="hover:text-brand-hover transition"
          >
            Who We Are
          </button>
          <button
            onClick={() => scrollTo("Showcase")}
            className="hover:text-brand-hover transition"
          >
            Showcase
          </button>
        </div>

        {/* Desktop Share Button */}
        <button
          onClick={handleShare}
          className="border-brand-primary/30 hover:bg-brand-primary/10 text-text-high hidden rounded-lg border px-4 py-2 text-sm transition hover:cursor-pointer md:block"
        >
          Share
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-text-high focus:outline-none md:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`bg-text-high block h-0.5 w-6 transition-transform duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`}
            ></span>
            <span
              className={`bg-text-high block h-0.5 w-6 transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`bg-text-high block h-0.5 w-6 transition-transform duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`text-text-medium bg-background-main/95 border-border-subtle absolute top-full left-0 mt-2 flex w-full origin-top flex-col gap-4 rounded-2xl border px-6 py-6 text-sm shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-4 scale-95 opacity-0"
        }`}
      >
        <button
          onClick={() => scrollTo("Hero")}
          className="hover:text-brand-hover text-left transition"
        >
          Home
        </button>
        <button
          onClick={() => scrollTo("About")}
          className="hover:text-brand-hover text-left transition"
        >
          About
        </button>
        <button
          onClick={() => scrollTo("Us")}
          className="hover:text-brand-hover text-left transition"
        >
          Who We Are
        </button>
        <button
          onClick={() => scrollTo("Showcase")}
          className="hover:text-brand-hover text-left transition"
        >
          Showcase
        </button>

        <button
          onClick={handleShare}
          className="border-brand-primary/30 hover:bg-brand-primary/10 text-text-high mt-2 rounded-lg border px-4 py-2 transition"
        >
          Share
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
