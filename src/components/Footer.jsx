import { useNavigate } from "react-router";
import useScroll from "../hooks/useScroll";
import Logo from "./Logo";

function Footer() {
  const { scrollTo } = useScroll();
  const navigate = useNavigate();
  const links = [
    { label: "Home", to: "hero" },
    { label: "About", to: "about" },
    { label: "Who We Are", to: "who" },
    { label: "Showcase", to: "showcase" },
  ];

  return (
    <footer className="text-text-high border-border-subtle relative border-t px-10 py-12">
      {/* Background glow */}
      <div className="bg-brand-primary pointer-events-none absolute bottom-0 left-1/2 h-[150px] w-[400px] -translate-x-1/2 rounded-full opacity-10 blur-[100px]"></div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center gap-1 md:items-start">
          <Logo />
          <span className="text-text-disabled text-xs">
            The state of development in Algeria · 2026
          </span>
        </div>

        {/* Nav links */}
        <div className="text-text-medium flex gap-6 text-sm">
          {links.map((link, i) => (
            <button
              key={i}
              onClick={() => scrollTo(link.to)}
              className="hover:text-brand-hover cursor-pointer transition"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              navigate("/data-privacy");
              setTimeout(function () {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              }, 20);
            }}
            className="hover:text-brand-hover cursor-pointer transition"
          >
            Data Privacy
          </button>
        </div>

        {/* Made by */}
        <div className="text-text-disabled text-center text-xs md:text-right">
          Made by college students in Algeria @ESI-SBA
        </div>
      </div>
    </footer>
  );
}

export default Footer;
