// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router";
import { useAuth } from "../Contexts/useAuth";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loader-bars"></div>;
  }

  if (!user) {
    // Navigate back to /oauth
    return <Navigate to="/oauth" replace />;
  }

  return children;
}

export default ProtectedRoute;
