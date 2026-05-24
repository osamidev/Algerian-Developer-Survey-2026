import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import BackToHomeBtn from "../components/BackToHomeBtn";

export default function SomethingWentWrong({ onRetry }) {
  return (
    <div className="bg-background-main mt-32 flex min-h-screen items-start justify-center text-white">
      <div className="z-10 w-full max-w-2xl rounded-2xl p-8 text-center backdrop-blur">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-300">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-3 font-mono text-4xl font-bold">
          Something went wrong
        </h1>
        <p className="mb-6 max-w-lg font-mono text-white/60">
          We couldn't load the survey questions.
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={onRetry}
            className="bg-brand-primary w-full cursor-pointer rounded-xl px-6 py-4 font-mono text-lg font-medium text-white duration-100 hover:scale-103 active:scale-97"
          >
            Retry
          </button>
          <BackToHomeBtn />
        </div>
      </div>
    </div>
  );
}
