import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';


function TalentLogin() {
  return (
    <div className="centered-page">
      <div className="card narrow">
        <h1 className="text-center mb-4">SALESTRACTION</h1>

        <form>
          {/* Champ Email */}
          <div className="mb-4 text-start">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="example@gmail.com" 
            />
          </div>

          {/* Champ Password */}
          <div className="mb-4 text-start">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter Your Password" 
            />
          </div>

          {/* Remember Me */}
          <div className="mb-4 form-check text-start">
            <input 
              type="checkbox" 
              className="form-check-input" 
              id="rememberMe" 
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>

          {/* Bouton Login */}
          <button className="btn btn-primary w-100 mb-3 py-2">
            Login
          </button>

          {/* Social Login */}
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

          {/* Lien Sign Up */}
          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account?</span>{' '}
            <Link to="/talent-signup" className="text-primary">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TalentLogin;
