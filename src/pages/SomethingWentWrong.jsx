import { Link } from "react-router-dom";

export default function SomethingWentWrong({ message, onRetry }) {
  return (
    <div className="bg-background-main flex min-h-screen items-center justify-center text-white">
      <div className="z-10 w-full max-w-2xl rounded-2xl bg-background-surface/30 p-8 text-center backdrop-blur">
        <div className="mb-6 flex items-center justify-center">
          <div className="bg-red-500/20 text-red-300 flex h-16 w-16 items-center justify-center rounded-full">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
            </svg>
          </div>
        </div>

        <h1 className="mb-3 font-mono text-3xl font-bold">Something went wrong</h1>
        <p className="mb-6 max-w-lg font-mono text-white/60">{message || "We couldn't load the survey questions."}</p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onRetry}
            className="bg-brand-primary hover:bg-brand-hover rounded-xl px-6 py-3 font-mono font-semibold text-white"
          >
            Retry
          </button>
          <Link
            to="/"
            className="bg-background-surface/20 rounded-xl px-6 py-3 font-mono font-medium text-white/90 border border-white/10"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
