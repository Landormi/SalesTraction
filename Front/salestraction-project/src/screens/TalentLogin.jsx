import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';

function TalentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const baseUrl = 'http://localhost:3000';
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(import.meta.env.VITE_APP_BACK_URL)
      const response = await fetch(`${import.meta.env.VITE_APP_BACK_URL}/api/auth/login/studiant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Tu peux gérer le token ici si besoin, ex: localStorage.setItem('token', data.token);
        navigate('/talent-show-offer');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error or server unreachable');
      console.error(err);
    }
  };

  return (
    <div className="centered-page">
      <div className="card narrow">
        <div className="d-flex align-items-center mb-4">
          <Link
            onClick={() => navigate(-1)}
            className="btn btn-outline-primary me-3 p-2 d-flex align-items-center justify-content-center back-button"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
            }}
          >
            <FaArrowLeft className="m-0" />
          </Link>
          <h1 className="mb-0 flex-grow-1 text-center">SALESTRACTION</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4 text-start">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 text-start">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check m-0">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>

            <Link to="/forget-password" className="text-decoration-none text-primary">
              Forgot password?
            </Link>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mb-3 py-2">
            Login
          </button>

          <div className="text-center mb-3">
            <p className="separator">Login with</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                type="button"
                className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
              >
                <FaLinkedin size={25} /> Login with LinkedIn
              </button>

              <button
                type="button"
                className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2"
              >
                <FcGoogle size={25} /> Login with Google
              </button>
            </div>
          </div>

          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account?</span>{' '}
            <Link to="/talent-signup" className="text-primary">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TalentLogin;
