import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';

function CreateNewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique de validation et de soumission
    if (password === confirmPassword) {
      // Redirection après confirmation réussie
      navigate('/login');
    }
  };

  return (
    <div className="centered-page">
      <div className="card narrow">
        {/* Header with back button */}
        <div className="d-flex align-items-center mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-outline-primary me-3 p-2 d-flex align-items-center justify-content-center back-button"
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              transition: 'all 0.3s ease'
            }}
          >
            <FaArrowLeft className="m-0" />
          </button>
          <h1 className="mb-0 flex-grow-1 text-center">SALESTRACTION</h1>
        </div>

        {/* Password Reset Content */}
        <div className="text-center">
          <h2 className="mb-4">New Password</h2>

          <form onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div className="mb-3 text-start">
              <label className="form-label">Enter Your Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 text-start">
              <label className="form-label">Confirm Your Password</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Button */}
            <button type="submit" className="btn btn-primary w-100 py-2 mb-3">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewPassword;