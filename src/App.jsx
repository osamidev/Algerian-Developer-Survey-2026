import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import ShowcasePage from "./pages/ShowcasePage";
import SurveyPage from "./pages/SurveyPage";
import OAuthPage from "./pages/OAuthPage";
import NotFound from "./pages/NotFound";
import AuthProvider from "./Contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="/oauth" element={<OAuthPage />} />
          <Route
            path="/survey"
            element={
              <ProtectedRoute>
                <SurveyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showcase"
            element={
              <ProtectedRoute>
                <ShowcasePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
