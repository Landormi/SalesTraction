import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function LoadingPage() {
  const navigate = useNavigate();

  return (
    <div className="centered-page">
      <div className="card narrow">
        {/* En-tête avec bouton Back */}
        <div className="d-flex align-items-center mb-3">
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

        <p className="lead mb-4">
          <em>Concrete missions. A transparent commission. A career that starts now.</em>
        </p>

        {/* Boutons empilés */}
        <div className="d-grid gap-3 mb-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/talent-login')}
          >
            I am a student
          </button>
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={() => navigate('/startup-login')}
          >
            I am a startup
          </button>
        </div>

        {/* Description */}
        <p className="text-muted">
          Paid missions, direct startup connections, real-time application tracking, and a public profile to boost your visibility.
        </p>
      </div>
    </div>
  );
}

export default LoadingPage;