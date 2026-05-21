function About() {
  const cards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "What is it?",
      description: "A community-driven survey built to capture the real state of software development in Algeria — tools, salaries, challenges, and trends.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
        </svg>
      ),
      title: "Why we made it?",
      description: "No public data exists on Algerian developers. We got tired of guessing and decided to ask — directly, openly, and without any agenda.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Who is it for?",
      description: "Every developer in Algeria — students, juniors, seniors, freelancers, and everyone in between. Your voice shapes the results.",
    },
    {
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
    </svg>
  ),
  title: "Just 5 minutes",
  description: "No long forms, no complicated questions. Quick and straight to the point — your time is respected.",
},
  ];

  return (
    <section id="About" className="relative py-28 px-10 text-text-high">

      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-primary opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-brand-light text-sm font-medium tracking-widest uppercase mb-4">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Why this survey<br />exists
          </h2>
          <p className="text-text-medium text-base leading-relaxed">
            Algeria has a growing developer community — but no real data about it.
            We built this survey to change that. No corporate agenda, no sponsorships.
            Just students who wanted honest answers.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group flex flex-col gap-4 p-6 bg-background-card border border-border-subtle rounded-2xl hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-light group-hover:bg-brand-primary/20 transition">
                {card.icon}
              </div>
              <h3 className="text-text-high font-semibold text-base">{card.title}</h3>
              <p className="text-text-medium text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default About;
