import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RouteHistoryProvider } from './RouteHistoryContext';
import LoadingPage from './screens/LoadingPage';
import TalentLogin from './screens/TalentLogin'; // Ajoutez cet import
import StartupLogin from './screens/StartupLogin'; // Ajoutez cet import
import StartupSignUp from './screens/StartupSinUp';
import TalentSignUp from './screens/TalentSignUp';
import ForgetPassword from './screens/ForgetPassword';
import VerifyOTP from './screens/VerifyOTP';
import CreateNewPassword from './screens/CreateNewPassword';
import ShowOffers from './screens/ShowOffers';
import AddOffers from './screens/AddOffers';
import ArchiveOffers from './screens/ArchiveOffer';
import ContactPage from './screens/ContactPage';
import ProfileStartup from './screens/ProfileStartup';
import DetailsOffer from './screens/DetailsOffer';


import './App.css';
import TalentShowOffers from './screens/TalentShowOffer';


function App() {
  return (
    <Router>
      <RouteHistoryProvider>
        <Routes>
          <Route path="/" element={<LoadingPage />} />
          <Route path="/talent-login" element={<TalentLogin />} />
          <Route path="/startup-login" element={<StartupLogin />} />
          <Route path="/startup-signup" element={<StartupSignUp />} />
          <Route path="/talent-signup" element={<TalentSignUp/>} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
          <Route path="/offers" element={<ShowOffers />} />
          <Route path="/add-offer" element={<AddOffers/>} />
          <Route path="/archive-offer" element={<ArchiveOffers/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/profile-startup" element={<ProfileStartup />} />
          <Route path="/offer/:id" element={<DetailsOffer />} />
          <Route path="/talent-show-offer" element={<TalentShowOffers />} />



        </Routes>
      </RouteHistoryProvider>
    </Router>
    
  );
}

export default App;