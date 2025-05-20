import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function LoadingPage() {
  const navigate = useNavigate();

  return (
    <div className="centered-page">
      <div className="card narrow">
        <h1 className="mb-3">SALESTRACTION</h1>

        <p className="lead mb-4">
          <em>Concrete missions. A transparent commission. A career that starts now.</em>
        </p>

        {/* Boutons empilés */}
        <div className="d-grid gap-3 mb-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/talent-login')}
          >
            I am a talent commercial
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
