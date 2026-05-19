import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import SurveyPage from "./pages/SurveyPage";
import OAuthPage from "./pages/OAuthPage";
import AuthProvider from "./Contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <>
    <AuthProvider>
      <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/oauth" element={<OAuthPage />} />
          <Route path="/survey" element={<ProtectedRoute><SurveyPage /></ProtectedRoute>} />
          <Route
            path="*"
            element={
              <p>
                Page Not Found <Link to="/">Go Home</Link>
              </p>
            }
          />
        </Routes>
    </AuthProvider>
      </>
  );
}

export default App;
