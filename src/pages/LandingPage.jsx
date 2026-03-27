import Hero from "../components/Hero";
import NavBar from "../components/NavBar";

function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#0B0E14] text-white flex flex-col font-mono">
      <NavBar />
      <Hero />
      
    </div>
  );
}

export default LandingPage;