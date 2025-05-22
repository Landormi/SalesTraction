import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaLinkedin, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';

function StartupLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACK_URL}/api/auth/login/startup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        // Optionnel : gérer rememberMe ici selon ta logique backend ou frontend
        navigate('/offers');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error or server unreachable');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centered-page">
      <div className="card narrow">
        <div className="d-flex align-items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-primary me-3 p-2 d-flex align-items-center justify-content-center back-button"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
            }}
            aria-label="Retour"
          >
            <FaArrowLeft className="m-0" />
          </button>
          <h1 className="mb-0 flex-grow-1 text-center">SALESTRACTION</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
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
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <Link to="/forget-password" className="text-decoration-none text-primary">Forgot password?</Link>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mb-3 py-2" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center mb-3">
            <p className="separator">Login with LinkedIn</p>
            <button
              type="button"
              className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            >
              <FaLinkedin size={20} /> SignUp with LinkedIn
            </button>
          </div>

          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account?</span>{' '}
            <Link to="/startup-signup" className="text-primary">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StartupLogin;
