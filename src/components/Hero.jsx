import AlgeriaMap from "../assets/AlgeriaMap.svg";
 
function Hero() {
  return (
    <section className="relative min-h-screen text-white overflow-hidden">
 
      {/* BACKGROUND Glow */}
      <div className="absolute top-[150px] left-[10px] w-[400px] h-[400px] lg:top-1/3 lg:left-1/3 lg:w-[500px] lg:h-[500px] bg-purple-600 opacity-40 blur-[100px] rounded-full pointer-events-none"></div>
 
      {/* ── MOBILE LAYOUT (hidden on lg+) ── */}
      <div className="lg:hidden">
        {/* Floating pills – mobile */}
        <div className="text-[11px] absolute top-7 left-3 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-md text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] -rotate-13">
          "PHP still king in Algeria?"
        </div>
        <div className="text-[11px] absolute top-11 left-58 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-md text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] rotate-13">
          "AI in Algeria"
        </div>
 
        {/* Map – mobile */}
        <div className="absolute pointer-events-none right-5 top-10">
          <img src={AlgeriaMap} alt="Algeria map" className="w-[900px] opacity-70" />
        </div>
 
        {/* Content – mobile */}
        <div className="relative z-10 max-w-7xl mx-auto px-10 pt-25 pb-20">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-center">
              The state of development in Algeria in 2026
            </h1>
            <p className="text-gray-400 text-center">
              No fluff, no sign-ups. Just 5 minutes to define the state of development in Algeria for 2026.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-3 py-4 bg-purple-600 rounded-lg">Take the survey</button>
              <button className="px-3 py-4 border border-white/20 rounded-lg">Learn more</button>
            </div>
          </div>
        </div>
      </div>
 
      {/* ── DESKTOP LAYOUT (lg+) ── */}
      <div className="hidden lg:flex relative z-10 max-w-7xl mx-auto px-10 pt-16 pb-20 items-center min-h-[calc(100vh-88px)]">
 
        {/* LEFT — Content */}
        <div className="flex-1 space-y-8 pr-6 xl:pr-10">
          <h1 className="text-5xl xl:text-6xl font-bold leading-tight">
            The state of<br />
            development in<br />
            Algeria in 2026
          </h1>
 
          <p className="text-gray-400 text-base xl:text-lg max-w-md">
            No fluff, no sign-ups. Just 5 minutes to define the state of development in Algeria for 2026.
          </p>
 
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 transition rounded-lg font-medium">
              Take the survey
            </button>
            <button className="px-6 py-3 border border-white/20 hover:border-white/40 transition rounded-lg">
              Learn more
            </button>
          </div>
        </div>
 
        {/* RIGHT — Map + floating pills */}
        <div className="relative flex-shrink-0 w-[520px] xl:w-[580px]">
 
          {/* Pill: top-left of map */}
          <div className="absolute -top-6 -left-4 z-20 px-4 py-2 text-[11px] bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-md text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] -rotate-6 whitespace-nowrap">
            "PHP still king in Algeria?"
          </div>
 
          {/* Pill: top-right of map */}
          <div className="absolute top-10 -right-8 z-20 px-4 py-2 text-[11px] bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-md text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] rotate-6 whitespace-nowrap">
            "AI in Algeria?"
          </div>
 
          {/* Pill: bottom-left of map */}
          <div className="absolute bottom-16 -left-10 z-20 px-4 py-2 text-[11px] bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-md text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] -rotate-3 whitespace-nowrap">
            "Remote work in DZ?"
          </div>
 
          {/* Pill: bottom-right of map */}
          <div className="absolute bottom-4 right-4 z-20 px-4 py-2 text-[11px] bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-md text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] rotate-4 whitespace-nowrap">
            "React or Vue?"
          </div>
 
          {/* Algeria Map */}
          <img
            src={AlgeriaMap}
            alt="Algeria map"
            className="w-full opacity-80 drop-shadow-[0_0_40px_rgba(139,92,246,0.25)]"
          />
        </div>
 
      </div>
 
    </section>
  );
}
 
export default Hero;