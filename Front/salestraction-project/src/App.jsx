import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingPage from './screens/Loading_page';
import TalentLogin from './screens/TalentLogin'; // Ajoutez cet import
import StartupLogin from './screens/StartupLogin'; // Ajoutez cet import
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/talent-login" element={<TalentLogin />} />
        <Route path="/startup-login" element={<StartupLogin />} />
      </Routes>
    </Router>
  );
}

export default App;