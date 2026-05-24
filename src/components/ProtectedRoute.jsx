// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router";
import { useAuth } from "../Contexts/useAuth";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="relative h-screen w-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(106,42,204,0.18),rgba(11,14,20,0)_52%)]" />
        <div className="loader-bars absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/oauth" replace />;
  }

  return children;
}

export default ProtectedRoute;
