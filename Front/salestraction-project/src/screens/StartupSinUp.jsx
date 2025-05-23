import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FaLinkedin,  FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function StartupSignUp() {
  const navigate = useNavigate();

  return (
    <div className="centered-page">
      <div className="card narrow">
        {/* En-tête avec bouton Back borduré et titre */}
                <div className="d-flex align-items-center mb-4">
                <Link 
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
                  </Link>
                  <h1 className="mb-0 flex-grow-1 text-center">SALESTRACTION</h1>
                </div>

        <form>
          {/* Champ Email */}
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="example@gmail.com" 
            />
          </div>

          {/* Champ Password */}
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter Your Password" 
            />
          </div>

          {/* Champ Confirm Password */}
          <div className="mb-3 text-start">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Confirm Your Password" 
            />
          </div>

          {/* Bouton Sign Up */}
          <button className="btn btn-primary w-100 mb-3 py-2"
          onClick={() => navigate('/profile-startup')}>
            Sign Up
          </button>

          {/* Séparateur */}
          <div className="text-center mb-3">
            <p className="separator">Or With</p>
          </div>

          {/* Bouton LinkedIn */}
          <button 
                type="button" 
                className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
              >
                <FaLinkedin size={25} /> Login with LinkedIn
              </button>

          {/* Lien Login */}
          <div className="text-center mt-3">
            <span className="text-muted">Already have an account?</span>{' '}
            <Link to="/startup-login" className="text-primary">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StartupSignUp;
