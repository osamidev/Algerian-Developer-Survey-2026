function WhoWeAre() {
  const members = [
    { name: "Yacia Mehdi Akram", role: "Frontend", status: "active" },
    { name: "Younes Belabbes", role: "Frontend", status: "active" },
    { name: "Mechri Issam", role: "Backend", status: "active" },
    { name: "Seddiki Anis", role: "Database", status: "active" },
    { name: "Kouidri Salah Eddine", role: "Database", status: "active" },
    { name: "Mefti Zakaria", role: "Design", status: "active" },
  ];

  const roleColors = {
    Frontend: "text-brand-light",
    Backend: "text-blue-400",
    Database: "text-emerald-400",
    Design: "text-pink-400",
  };

  return (
    <section id="who" className="relative py-28 px-10 text-text-high">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary opacity-15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <p className="text-brand-light text-sm font-medium tracking-widest uppercase mb-4">
            Who we are
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Built by students,<br />for developers
          </h2>
          <p className="text-text-medium text-base leading-relaxed">
            We're a team of 6 computer science students from Algeria who got
            tired of having no data about our own dev community — so we built this.
          </p>
        </div>

        {/* Terminal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((member, i) => (
            <div
              key={i}
              className="group bg-background-card border border-border-subtle rounded-2xl overflow-hidden hover:border-brand-primary/30 transition-all duration-300"
            >
              {/* Terminal top bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-black/30 border-b border-border-subtle">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
                <span className="ml-2 text-[10px] text-text-disabled tracking-widest">member.js</span>
              </div>

              {/* Terminal body */}
              <div className="px-5 py-5 text-[13px] leading-7 font-primary">
                <span className="text-text-disabled">const </span>
                <span className="text-brand-light">member</span>
                <span className="text-text-medium"> = </span>
                <span className="text-text-medium">{"{"}</span>
                <br />

                <span className="pl-4 text-text-disabled">name</span>
                <span className="text-text-medium">: </span>
                <span className="text-brand-accent">"{member.name}"</span>
                <span className="text-text-medium">,</span>
                <br />

                <span className="pl-4 text-text-disabled">role</span>
                <span className="text-text-medium">: </span>
                <span className={`${roleColors[member.role]}`}>"{member.role}"</span>
                <span className="text-text-medium">,</span>
                <br />

                <span className="pl-4 text-text-disabled">status</span>
                <span className="text-text-medium">: </span>
                <span className="text-emerald-400">"{member.status}"</span>
                <br />

                <span className="text-text-medium">{"}"}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhoWeAre;