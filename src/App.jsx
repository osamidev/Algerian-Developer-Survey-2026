import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuestionCard from "./features/survey/QuestionCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/survey" element={<QuestionCard />} />
      <Route path="*" element={<p>Not Found<Link to="/">Go Home</Link></p>} />
    </Routes>
  );
}

export default App;
