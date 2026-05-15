import Logo from "./../components/Logo";
function GoogleButton({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#747775] bg-white px-4 py-3 font-mono text-sm font-medium tracking-wide text-[#1f1f1f] transition-colors duration-150 hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <GoogleIcon />
      <span className="flex-1 text-sm font-semibold">Continue with Google</span>
    </button>
  );
}

function GitHubButton({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full cursor-pointer items-center rounded-xl border border-[#30363d] bg-[#24292f] px-4 py-4 font-mono text-sm font-medium tracking-wide text-white transition-colors duration-150 hover:bg-[#32383f] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <GitHubIcon />
      <span className="flex-1 text-sm font-semibold">Continue with GitHub</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className="shrink-0"
  >
    <path
      d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="white"
    className="shrink-0"
  >
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.572C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function FooterLinks() {
  return (
    <p className="text-center font-mono text-xs tracking-wide text-white/30">
      By continuing you agree to our{" "}
      <a
        href="#"
        className="text-white/50 underline-offset-2 hover:text-white/70 hover:underline"
      >
        Terms
      </a>{" "}
      &amp;{" "}
      <a
        href="#"
        className="text-white/50 underline-offset-2 hover:text-white/70 hover:underline"
      >
        Privacy
      </a>
      .
    </p>
  );
}

// export default function OAuthPage() {
//   function handleOAuth(provider) {
//     // TODO: redirect to provider OAuth URL
//     console.log("OAuth with", provider);
//   }

//   return (
//     <div className="bg-background-main scrollbar-hide relative flex h-dvh max-w-dvw flex-col overflow-x-hidden overflow-y-auto text-white">
//       {/* Top gradient halo */}
//       <div className="from-brand-primary/20 pointer-events-none absolute top-0 right-0 left-0 h-[45vh] bg-gradient-to-b to-transparent opacity-80" />

//       {/* Logo — top-center on mobile, top-left on md+ */}
//       <div className="relative z-10 flex w-full px-6 pt-8 md:justify-start">
//         <Logo />
//       </div>

//       {/* Auth content — centered vertically in remaining space */}
//       <div className="relative z-10 flex flex-1 flex-col items-center px-5 py-12">
//         {/* Heading */}
//         <div className="mb-10 w-full max-w-sm pt-24 text-center text-start md:text-left">
//           <h1 className="justify-center text-2xl leading-snug font-bold tracking-wide text-white">
//             Sign in to continue
//           </h1>
//           {/* <p className="mt-2 font-mono text-lg tracking-wide text-white/40">
//             Choose a provider to get started.
//           </p> */}
//         </div>

//         {/* Buttons — bare on mobile, card-wrapped on md+ */}
//         <div className="md:border-border-subtle md:bg-background-card w-full max-w-sm md:rounded-2xl md:border md:p-6">
//           <div className="flex flex-col gap-3">
//             <GoogleButton onClick={() => handleOAuth("google")} />
//             <GitHubButton onClick={() => handleOAuth("github")} />
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 w-full max-w-sm">
//           <FooterLinks />
//         </div>
//       </div>
//     </div>
//   );
// }

export default function OAuthPage() {
  function handleOAuth(provider) {
    // We send the user to the BACKEND, which then sends them to Google/GitHub
    if (provider === "github") {
      const scope = "read:user user:email"; // Adjust scopes as needed
      const redirectUri = "http://localhost:4000/auth/github/callback"; // Your backend callback URL
      const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
      console.log(clientId);
      const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
      window.location.assign(githubUrl);
    } else if (provider === "google") {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const redirectUri = "http://localhost:4000/auth/google/callback";
      const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid email profile&response_type=code`;
      window.location.assign(googleUrl);
    }
  }

  return (
    <div className="selection:bg-brand-primary/30 bg-background-main relative flex min-h-screen flex-col text-white">
      {/* Visual background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-brand-primary/10 absolute -top-[10%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-[100%] blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl px-6 py-8">
        <Logo />
      </div>

      {/* Main Container */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-20">
        <div className="w-full max-w-[420px]">
          {/* Text Section */}
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="bg-brand-primary/10 ring-brand-primary/20 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ring-1 backdrop-blur-md">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-primary"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h1 className="font-mono text-3xl font-bold tracking-tight text-white antialiased">
              Join the 2026 Survey
            </h1>
            <p className="mt-3 px-4 font-mono text-sm tracking-wide text-white/50">
              Authenticate to participate. We use this strictly to prevent
              duplicate submissions.
            </p>
          </div>

          {/* Social Card */}
          <div className="bg-background-surface/20 relative overflow-hidden rounded-[2rem] border border-white/10 p-8 shadow-2xl backdrop-blur-md md:p-10">
            {/* Subtle inner glow */}
            <div className="bg-brand-primary/10 absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col gap-4">
              <GitHubButton onClick={() => handleOAuth("github")} />
              <GoogleButton onClick={() => handleOAuth("google")} />
            </div>

            <div className="relative z-10 mt-8 flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="font-mono text-xs font-semibold tracking-widest text-white/30 uppercase">
                Anonymous & Secure
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <p className="relative z-10 mt-6 text-center font-mono text-[11px] leading-relaxed text-white/40">
              Your identity is decoupled from your survey answers. Your
              responses remain 100% anonymous.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-10">
            <FooterLinks />
          </div>
        </div>
      </main>
    </div>
  );
}
