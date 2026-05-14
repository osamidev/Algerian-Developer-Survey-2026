function Footer() {
  const links = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Who We Are", href: "#" },
    { label: "Showcase", href: "#" },
  ];

  return (
    <footer className="relative px-10 py-12 text-text-high border-t border-border-subtle">

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-brand-primary opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Logo + tagline */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-xl font-semibold tracking-tight text-text-high">insight</span>
          <span className="text-xs text-text-disabled">The state of development in Algeria · 2026</span>
        </div>

        {/* Nav links */}
        <div className="flex gap-6 text-sm text-text-medium">
          {links.map((link, i) => (
            <a key={i} href={link.href} className="hover:text-brand-hover transition">
              {link.label}
            </a>
          ))}
        </div>

        {/* Made by */}
        <div className="text-xs text-text-disabled text-center md:text-right">
          Made by college students in Algeria @ESI-SBA
        </div>

      </div>

    </footer>
  );
}

export default Footer;
