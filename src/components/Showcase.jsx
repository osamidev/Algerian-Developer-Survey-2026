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
    <section id="showcase" className="text-text-high relative px-10 py-28">
      {/* Background glow */}
      <div className="bg-brand-primary pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"></div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-brand-light mb-4 text-sm font-medium tracking-widest uppercase">
            Showcase
          </p>
          <h2 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
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
        <div className="mb-16 flex flex-wrap justify-center gap-4 md:gap-8">
          {units.map((unit, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="bg-background-card border-border-subtle hover:border-brand-primary/30 relative flex h-28 w-28 items-center justify-center rounded-2xl border transition md:h-36 md:w-36">
                <div className="bg-brand-primary absolute inset-0 rounded-2xl opacity-5"></div>
                <span className="text-text-high text-4xl font-bold tabular-nums md:text-5xl">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-text-disabled text-xs tracking-widest uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider dots */}
        <div className="mb-12 flex justify-center gap-2">
          <span className="bg-brand-primary/40 h-1.5 w-1.5 rounded-full"></span>
          <span className="bg-brand-primary/70 h-1.5 w-1.5 rounded-full"></span>
          <span className="bg-brand-primary/40 h-1.5 w-1.5 rounded-full"></span>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-text-medium text-center text-sm">
            Help spread the word — the more responses, the better the data.
          </p>
          <button
            onClick={handleShare}
            className="bg-brand-primary hover:bg-brand-hover flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition"
          >
            {copied ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Link copied!
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
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
