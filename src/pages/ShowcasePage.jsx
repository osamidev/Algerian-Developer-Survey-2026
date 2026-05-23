import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function ShowcasePage() {
  return (
    <div className="bg-background-main text-text-high relative min-h-screen overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(106,42,204,0.22),rgba(11,14,20,0)_48%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(199,255,31,0.08),rgba(11,14,20,0)_42%)]" />

      <NavBar />

      <main className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <section className="border-border-subtle/60 bg-background-card/35 w-full max-w-3xl rounded-4xl border p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
            Coming Soon
          </div>

          <div className="max-w-2xl">
            <h1 className="font-primary text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
              The showcase is being built.
            </h1>
            <p className="text-text-medium mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
              We’re preparing the results, highlights, and visual breakdown for
              the Algerian Developer Survey. The page will go live soon.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/"
              className="bg-background-surface/60 hover:bg-background-surface inline-flex h-14 flex-1 items-center justify-center rounded-xl border border-white/10 px-6 text-base font-semibold transition-colors"
            >
              Back Home
            </Link>
            <Link
              to="/oauth"
              className="bg-brand-primary hover:bg-brand-hover inline-flex h-14 flex-1 items-center justify-center rounded-xl px-6 text-base font-semibold text-white transition-colors"
            >
              Take the Survey
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ShowcasePage;
