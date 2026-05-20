import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-background-main flex min-h-screen items-center justify-center text-white">
      <div className="z-10 w-full max-w-2xl rounded-2xl bg-background-surface/30 p-8 text-center backdrop-blur">
        <div className="mb-6 flex items-center justify-center">
          <div className="bg-brand-primary/20 text-brand-primary flex h-16 w-16 items-center justify-center rounded-full">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 1112 3a9 9 0 019 9z" />
            </svg>
          </div>
        </div>

        <h1 className="mb-3 font-mono text-3xl font-bold">Page Not Found</h1>
        <p className="mb-6 font-mono text-white/60">
          The page you were looking for does not exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="bg-brand-primary hover:bg-brand-hover rounded-xl px-6 py-3 font-mono font-semibold text-white"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
