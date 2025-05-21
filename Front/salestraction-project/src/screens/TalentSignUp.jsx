import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function TalentSignUp() {
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
          {/* Champ Email - Sans label comme sur l'image */}
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

          {/* Bouton Sign Up - Plus large et plus visible */}
          <button className="btn btn-primary w-100 mb-4 py-2 fw-bold">
            Sign Up
          </button>

          {/* Séparateur stylisé */}
          <div className="d-flex align-items-center mb-4">
            <hr className="flex-grow-1" />
            <span className="px-3 text-muted">Or With</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Boutons sociaux */}
          <div className="d-flex flex-column gap-3 mb-4">
            <button 
              type="button" 
              className="btn btn-outline-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            >
              <FaLinkedin size={20} /> Login with LinkedIn
            </button>
            <button 
              type="button" 
              className="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center gap-2"
            >
              <FcGoogle size={20} /> Login with Google
            </button>
          </div>

          {/* Lien Login */}
          <div className="text-center mt-3">
            <span className="text-muted">Already have an account?</span>{' '}
            <Link to="/talent-login" className="text-primary">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TalentSignUp;