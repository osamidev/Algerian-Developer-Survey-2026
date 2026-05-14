import AlgeriaMap from "../assets/AlgeriaMap.svg";

function Hero() {
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  }
  return (
    <section id="Hero" className="relative min-h-screen text-text-high flex flex-col items-center justify-center">

      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-brand-primary opacity-20 blur-[140px] rounded-full pointer-events-none"></div>

      {/* ── MAP — absolute, centered, behind everything ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none
        w-[100vw] sm:w-[75vw] md:w-[520px] lg:w-[600px]
      ">
        <img
          src={AlgeriaMap}
          alt="Algeria map"
          className="w-full"
          style={{
            filter:
              "drop-shadow(0 0 8px rgba(160,80,255,0.95)) drop-shadow(0 0 24px rgba(120,40,220,0.5)) drop-shadow(0 0 60px rgba(100,20,200,0.2))",
          }}
        />

        {/* Pill: top center — above the map */}
        <div className="absolute -top-5 sm:top-5 left-1/2 -translate-x-1/2 -rotate-2
          px-2 py-1 text-[9px] sm:text-[11px]
          bg-black/70 border border-brand-primary/40 rounded-full
          backdrop-blur-md text-brand-light
          shadow-[0_0_10px_rgba(139,92,246,0.2)] whitespace-nowrap z-10 pointer-events-auto">
          "PHP: Still king in Algeria ?"
        </div>

        {/* Pill: left — positioned inside map bounds on mobile */}
        <div className="absolute top-[25%] left-[2%] sm:-left-[15%] -rotate-10
          px-2 py-1 text-[9px] sm:text-[11px]
          bg-black/70 border border-brand-primary/40 rounded-full
          backdrop-blur-md text-brand-light
          shadow-[0_0_10px_rgba(139,92,246,0.2)] whitespace-nowrap z-10 pointer-events-auto">
          "NVIDIA vs. AMD"
        </div>

        {/* Pill: right — positioned inside map bounds on mobile */}
        <div className="absolute top-[10%] right-[1%] sm:-right-[22%] rotate-6
          px-2 py-1 text-[9px] sm:text-[11px]
          bg-black/70 border border-brand-primary/40 rounded-full
          backdrop-blur-md text-brand-light
          shadow-[0_0_10px_rgba(139,92,246,0.2)] whitespace-nowrap z-10 pointer-events-auto">
          "Freelance in Algeria"
        </div>

      </div>

      {/* ── CONTENT — centered on top of the map ── */}
      <div className="relative z-10 flex flex-col items-center text-center gap-5 px-6 py-8 md:py-20 w-full max-w-2xl mx-auto">

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          The state of development<br />in Algeria in 2026
        </h1>

        <p className="text-text-medium text-sm md:text-base max-w-md">
          No fluff, no sign-ups.{" "}
          <span className="text-text-high font-bold">Just 5 minutes</span>{" "}
          to define the state of development in{" "}
          <span className="text-text-high font-bold">Algeria</span> for{" "}
          <span className="text-text-high font-bold">2026</span>.
        </p>

        <div className="flex gap-4">
          <button className="px-6 py-3 bg-brand-primary hover:bg-brand-hover transition rounded-lg font-medium text-sm">
            Take the survey
          </button>
          <button onClick={() => scrollTo("About")} className="px-6 py-3 border border-border-subtle hover:border-brand-primary/40 transition rounded-lg text-sm">
            Learn more
          </button>
        </div>

      </div>

    </section>
  );
}

export default Hero;