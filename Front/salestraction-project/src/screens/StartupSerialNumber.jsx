import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { RouteHistoryContext } from '../RouteHistoryContext';


function StartupSerialNumber() {
  const { previousPath } = useContext(RouteHistoryContext);
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
        
        <div className="instruction-text mb-4">
          <p className="text-center">Please enter your SIRET number or your name to verify</p>
        </div>

        <form>
          {/* Champ SIRET number */}
          <div className="mb-3 text-start">
            <label className="form-label">SIRET number or name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="SIRET number or name" 
            />
          </div>

          {/* Bouton de soumission */}
          <button 
            className="btn btn-primary w-100 mb-3 py-2"
            onClick={() => navigate('/startup-login')}
          >
            Continue
          </button>

        </form>
      </div>
    </div>
  );
}

export default StartupSerialNumber;