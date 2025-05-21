import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useRef, useState } from 'react';

function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (/^[0-9]*$/.test(value)) { // Seulement des chiffres acceptés
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus sur le champ suivant
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Gestion de la touche Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (/^[0-9]*$/.test(pasteData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        if (i < 6) {
          newOtp[i] = pasteData[i];
        }
      }
      setOtp(newOtp);
    }
  };

  return (
    <div className="centered-page">
      <div className="card narrow">
        {/* En-tête avec bouton Back */}
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

        {/* OTP Verification Content */}
        <div className="text-center">
          <h2 className="mb-3">OTP Verification</h2>
          <p className="text-muted mb-4">
            A verification code was sent to your<br />email
          </p>

          <form>
            {/* OTP Input */}
            <div className="mb-4">
              <label className="form-label">Enter your verification code</label>
              <div className="d-flex justify-content-center gap-2">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="form-control text-center otp-input"
                    style={{ width: '3rem', height: '3rem', fontSize: '1.5rem' }}
                    value={otp[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    autoFocus={i === 0}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button className="btn btn-primary w-100 py-2 mb-3">
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;