import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingPage from './screens/Loading_page';
import TalentLogin from './screens/TalentLogin'; // Ajoutez cet import
import StartupLogin from './screens/StartupLogin'; // Ajoutez cet import
import StartupSignUp from './screens/StartupSinUp';
import TalentSignUp from './screens/TalentSignUp';
import ForgetPassword from './screens/ForgetPassword';
import VerifyOTP from './screens/VerifyOTP';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/talent-login" element={<TalentLogin />} />
        <Route path="/startup-login" element={<StartupLogin />} />
        <Route path="/startup-signup" element={<StartupSignUp />} />
        <Route path="/talent-signup" element={<TalentSignUp/>} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </Router>
  );
}

export default App;