import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SurveyPage from "./pages/SurveyPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
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
  );
}

export default App;
