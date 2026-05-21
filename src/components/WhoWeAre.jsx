function WhoWeAre() {
  const members = [
    { name: "Yacia Mehdi Akram", role: "Frontend", status: "active" },
    { name: "Belabbas Younes", role: "Frontend/Design", status: "active" },
    { name: "Mecheri Issam Eddine", role: "Backend", status: "active" },
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
    <section id="who" className="text-text-high relative px-10 py-28">
      {/* Background glow */}
      <div className="bg-brand-primary pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[140px]"></div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-xl text-center">
          <p className="text-brand-light mb-4 text-sm font-medium tracking-widest uppercase">
            Who we are
          </p>
          <h2 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
            Built by students,
            <br />
            for developers
          </h2>
          <p className="text-text-medium text-base leading-relaxed">
            We're a team of 6 computer science students from Algeria who got
            tired of having no data about our own dev community — so we built
            this.
          </p>
        </div>

        {/* Terminal grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <div
              key={i}
              className="group bg-background-card border-border-subtle hover:border-brand-primary/30 overflow-hidden rounded-2xl border transition-all duration-300"
            >
              {/* Terminal top bar */}
              <div className="border-border-subtle flex items-center gap-2 border-b bg-black/30 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70"></span>
                <span className="text-text-disabled ml-2 text-[10px] tracking-widest">
                  member.js
                </span>
              </div>

              {/* Terminal body */}
              <div className="font-primary px-5 py-5 text-[13px] leading-7">
                <span className="text-text-disabled">const </span>
                <span className="text-brand-light">member</span>
                <span className="text-text-medium"> = </span>
                <span className="text-text-medium">{"{"}</span>
                <br />

                <span className="text-text-disabled pl-4">name</span>
                <span className="text-text-medium">: </span>
                <span className="text-brand-accent">"{member.name}"</span>
                <span className="text-text-medium">,</span>
                <br />

                <span className="text-text-disabled pl-4">role</span>
                <span className="text-text-medium">: </span>
                <span className={`${roleColors[member.role]}`}>
                  "{member.role}"
                </span>
                <span className="text-text-medium">,</span>
                <br />

                <span className="text-text-disabled pl-4">status</span>
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
