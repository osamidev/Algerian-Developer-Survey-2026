import { Link } from "react-router";
import AlgeriaMap from "../assets/AlgeriaMap.svg";
// hii
function Hero() {
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="Hero"
      className="text-text-high relative isolate flex h-auto items-start justify-start overflow-hidden px-4 pt-32 sm:mt-4 sm:min-h-dvh sm:items-center sm:justify-center sm:px-6 sm:pt-0 sm:pb-8 md:mt-0 lg:px-10 lg:pb-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(106,42,204,0.18),rgba(11,14,20,0)_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(106,42,204,0.12),rgba(11,14,20,0)_58%)]" />

      {/* Map - Absolute positioning behind everything */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative h-full w-full max-w-6xl">
          <img
            src={AlgeriaMap}
            alt="Algeria map"
            className="absolute top-1/2 left-1/2 w-[min(96vw,680px)] -translate-x-1/2 -translate-y-1/2 opacity-60"
            style={{
              filter:
                "drop-shadow(0 0 8px rgba(160,80,255,0.95)) drop-shadow(0 0 24px rgba(120,40,220,0.58)) drop-shadow(0 0 72px rgba(100,20,200,0.24))",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.8) 14%, rgba(0,0,0,0.68) 32%, rgba(0,0,0,0.28) 58%, rgba(0,0,0,0) 82%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.8) 14%, rgba(0,0,0,0.68) 32%, rgba(0,0,0,0.28) 58%, rgba(0,0,0,0) 82%)",
            }}
          />
        </div>
      </div>

      {/* Content - Relative positioning on top */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center pt-0">
        <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <h1 className="font-primary text-[42px] leading-[1.1] font-bold text-white sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px]">
            The state of development in Algeria in 2026
          </h1>

          <p className="text-text-medium mt-5 max-w-2xl text-base leading-relaxed sm:mt-6 sm:text-lg md:text-xl">
            No fluff, no sign-ups.{" "}
            <span className="text-text-high font-bold">Just 5 minutes</span> to
            define the state of development in{" "}
            <span className="text-text-high font-bold">Algeria</span> for{" "}
            <span className="text-text-high font-bold">2026</span>.
          </p>

          <div className="mt-8 flex w-full max-w-xl flex-row gap-4 sm:mt-10">
            <Link
              to="/survey"
              className="bg-brand-primary hover:bg-brand-hover inline-flex h-14 flex-1 items-center justify-center rounded-lg px-6 text-base font-semibold tracking-tight text-white transition-colors sm:text-lg"
            >
              Take the survey
            </Link>
            <button
              onClick={() => scrollTo("About")}
              className="border-border-subtle hover:border-brand-primary/50 inline-flex h-14 flex-1 items-center justify-center rounded-lg border bg-transparent px-6 text-base font-medium tracking-tight text-white transition-colors sm:text-lg"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
