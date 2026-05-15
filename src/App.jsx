import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import SurveyPage from "./pages/SurveyPage";
import OAuthPage from "./pages/OAuthPage";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<OAuthPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route
          path="*"
          element={
            <p>
              Page Not Found <Link to="/">Go Home</Link>
            </p>
          }
        />
      </Routes>
    </>
  );
}

export default App;
