import { Home } from "lucide-react";
import { Link } from "react-router";

export default function BackToHomeBtn() {
  return (
    <Link
      to="/"
      className="bg-background-surface/30 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-4 font-mono text-lg font-medium text-white transition-colors hover:bg-white/5"
    >
      <Home className="h-5 w-5" />
      Back to Home
    </Link>
  );
}
