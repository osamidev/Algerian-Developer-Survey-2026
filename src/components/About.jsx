function About() {
  const cards = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "What is it?",
      description:
        "A community-driven survey built to capture the real state of software development in Algeria — tools, salaries, challenges, and trends.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z"
          />
        </svg>
      ),
      title: "Why we made it?",
      description:
        "No public data exists on Algerian developers. We got tired of guessing and decided to ask — directly, openly, and without any agenda.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Who is it for?",
      description:
        "Every developer in Algeria — students, juniors, seniors, freelancers, and everyone in between. Your voice shapes the results.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
          />
        </svg>
      ),
      title: "Just 5 minutes",
      description:
        "No long forms, no complicated questions. Quick and straight to the point — your time is respected.",
    },
  ];

  return (
    <section id="about" className="text-text-high relative px-10 py-28">
      {/* Background glow */}
      <div className="bg-brand-primary pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full opacity-20 blur-[120px]"></div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-brand-light mb-4 text-sm font-medium tracking-widest uppercase">
            About
          </p>
          <h2 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
            Why this survey
            <br />
            exists
          </h2>
          <p className="text-text-medium text-base leading-relaxed">
            Algeria has a growing developer community — but no real data about
            it. We built this survey to change that. No corporate agenda, no
            sponsorships. Just students who wanted honest answers.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group bg-background-card border-border-subtle hover:border-brand-primary/40 hover:bg-brand-primary/5 flex flex-col gap-4 rounded-2xl border p-6 transition-all duration-300"
            >
              <div className="bg-brand-primary/10 border-brand-primary/20 text-brand-light group-hover:bg-brand-primary/20 flex h-10 w-10 items-center justify-center rounded-xl border transition">
                {card.icon}
              </div>
              <h3 className="text-text-high text-base font-semibold">
                {card.title}
              </h3>
              <p className="text-text-medium text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
