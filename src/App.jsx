import { Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Survey from './pages/Survey';



function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />     
      </Routes>
      
    
  );
}

export default App;
