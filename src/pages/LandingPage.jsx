import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import About from "../components/About";
import WhoWeAre from "../components/WhoWeAre";
import Showcase from "../components/Showcase";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="bg-background-main text-text-high font-primary flex min-h-screen w-full flex-col overflow-hidden pt-20">
      <NavBar />
      <Hero />
      <About />
      <WhoWeAre />
      <Showcase />
      <Footer />
    </div>
  );
}

export default LandingPage;
