import { useState, useEffect } from "react";

const LAUNCH_DATE = new Date("2026-06-01T00:00:00");

function Showcase() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [copied, setCopied] = useState(false);

  function getTimeLeft() {
    const diff = LAUNCH_DATE - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.origin + "/survey");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section id="showcase" className="relative py-28 px-10 text-text-high">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-light text-sm font-medium tracking-widest uppercase mb-4">
            Showcase
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Survey closes June 1st
          </h2>
          <p className="text-text-medium text-base leading-relaxed">
            The survey runs for{" "}
            <span className="text-text-high font-bold">10 days only</span>.
            After that we analyze the data and publish the full results report —
            free for every developer in Algeria.
          </p>
        </div>

        {/* Countdown */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {units.map((unit, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center bg-background-card border border-border-subtle rounded-2xl hover:border-brand-primary/30 transition">
                <div className="absolute inset-0 rounded-2xl bg-brand-primary opacity-5"></div>
                <span className="text-4xl md:text-5xl font-bold tabular-nums text-text-high">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-xs text-text-disabled tracking-widest uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider dots */}
        <div className="flex justify-center gap-2 mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/40"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/70"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/40"></span>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-text-medium text-sm">
            Help spread the word — the more responses, the better the data.
          </p>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-hover transition rounded-lg font-medium text-sm"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Link copied!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Share the survey
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}

export default Showcase;