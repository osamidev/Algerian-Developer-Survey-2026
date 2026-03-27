import AlgeriaMap from "../assets/AlgeriaMap.svg";

function Hero() {
  return (
    <section className="relative min-h-screen text-white overflow-hidden">

      {/* Floating Question Pills */}
        <div className=" text-[11px] absolute top-7 left-3  px-4 py-2 text-xs bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-md text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] -rotate-13">
          "PHP still king in Algeria ?"
        </div>

         <div className=" text-[11px] absolute top-11 left-58  px-4 py-2 text-xs bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-md text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] rotate-13">
          " AI in Algeria "
        </div>

        

      {/* BACKGROUND Glow */}  
      <div className="absolute top-[150px] left-[10px] w-[400px] h-[400px] lg:top-1/5 lg:left-1/3 lg:w-[500px] bg-purple-600 opacity-40 blur-[100px] rounded-full"></div>
      
      {/* BACKGROUND MAP */}
      <div className="absolute pointer-events-none   right-5 top-10">
        <img
          src={AlgeriaMap}
          alt="Algeria map"
          className="w-[900px]  opacity-70 "
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 pt-25 pb-20">
        
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-center">
            The state of development in Algeria in 2026
          </h1>

          <p className="text-gray-400 text-center">
            No fluff, no sign-ups. Just 5 minutes to define the state of
            development in Algeria for 2026.
          </p>

          <div className="flex gap-4 justify-center ">
            <button className="px-3 py-4 bg-purple-600 rounded-lg">
              Take the survey
            </button>

            <button className=" px-3 py-4 border border-white/20 rounded-lg">
              Learn more
            </button>
          </div>
        </div>

      </div>

      {/* Floating Question Pills */}
        <div className="absolute -top-16 left-10 hidden md:block px-4 py-2 text-xs bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-md text-purple-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] -rotate-15">
          "PHP still king in Algeria?"
        </div>
    </section>
  );
}

export default Hero;
