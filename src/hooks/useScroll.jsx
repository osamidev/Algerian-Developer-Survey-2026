import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function useScroll() {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Listen for location changes and scroll if needed
  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollToId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(location.state.scrollToId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        navigate("/", { replace: true, state: {} });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  // 2. Updated scroll logic to handle multi-page checks
  function scrollTo(id) {
    // If we are on the home page, scroll normally
    if (location.pathname === "/") {
      if (id === "hero") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // If we are on /oauth or any other page, redirect home and send the ID along
      navigate("/", { state: { scrollToId: id } });
    }
  }

  return { scrollTo };
}
