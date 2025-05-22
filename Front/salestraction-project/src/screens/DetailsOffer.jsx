import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBars, FaTimes, FaDownload, FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';

function DetailsOffer() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [expandedApplicationId, setExpandedApplicationId] = useState(null);
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Talent 1",
      email: "example1@gmail.com",
      university: "Université de Paris",
      linkedin: "https://www.linkedin.com/in/username1",
      secteur: "Technologie",
      diplome: "Master Informatique",
      languages: "Français, Anglais",
      status: "Pending"
    },
    {
      id: 2,
      name: "Talent 2",
      email: "example2@gmail.com",
      university: "Sorbonne",
      linkedin: "https://www.linkedin.com/in/username2",
      secteur: "Marketing",
      diplome: "MBA",
      languages: "Français, Espagnol",
      status: "Approved"
    },
    {
      id: 3,
      name: "Talent 3",
      email: "example3@gmail.com",
      university: "HEC Paris",
      linkedin: "https://www.linkedin.com/in/username3",
      secteur: "Finance",
      diplome: "Master Finance",
      languages: "Anglais, Allemand",
      status: "Rejected"
    }
  ]);

  const offer = {
    id: 1,
    title: "Offer 1",
    startup: "Tech Innovators",
    location: "Paris, France",
    product: "SaaS Platform for HR Management",
    method: "Online implementation with training sessions",
    workType: "Online",
    commission: "15% of each subscription sold",
    document: "product_brochure.pdf",
    description: "A cutting-edge SaaS platform to streamline HR processes for modern organizations.",
    condition: "Subscription-based access with onboarding support",
    priceRange: "€100 - €500/month",
    commissionType: "Percentage",
    targetCustomers: "HR departments, SMEs, and enterprises"
  };

  const sidebarStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '250px',
    zIndex: 100
  };

  const buttonCircleStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%'
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved': return 'bg-success';
      case 'Rejected': return 'bg-danger';
      default: return 'bg-warning text-dark';
    }
  };

  const toggleApplicationDetails = (id) => {
    setExpandedApplicationId(prevId => prevId === id ? null : id);
  };

  const handleEmailAction = (id, email, subject, body, newStatus) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setApplications(prevApps => prevApps.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="centered-page">
      <div className="card position-relative">
        <nav className={`sidebar bg-light p-3 shadow ${showMenu ? 'd-block' : 'd-none'}`} style={sidebarStyle}>
          <button onClick={() => setShowMenu(false)} className="btn btn-close mb-3" />
          <h5>Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item"><a className="nav-link" href="/offers">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/add-offer">Add Offers</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Archive</a></li>
            <li className="nav-item"><a className="nav-link" href="/profile-startup">Profile</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
            <li className="nav-item"><a className="nav-link text-danger" href="#">Logout</a></li>
          </ul>
        </nav>

        <header className="d-flex align-items-center mb-4" style={{ marginLeft: showMenu ? '250px' : '0', transition: 'margin 0.3s ease' }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="btn btn-outline-primary me-2 p-2 d-flex align-items-center justify-content-center"
            style={buttonCircleStyle}
          >
            {showMenu ? <FaTimes /> : <FaBars />}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-primary me-3 p-2 d-flex align-items-center justify-content-center"
            style={buttonCircleStyle}
          >
            <FaArrowLeft />
          </button>
          <div className="text-center flex-grow-1">
            <h1 className="mb-1">SALESTRACTION</h1>
          </div>
          <div style={{ width: '40px' }} />
        </header>

        <main className="px-3" style={{ marginLeft: showMenu ? '250px' : '0', transition: 'margin 0.3s ease' }}>
          <section className="mb-4 text-start">
            <h2 className="mb-3">{offer.title}</h2>
            <div className="d-flex align-items-center mb-3">
              <FaMapMarkerAlt className="me-2 text-danger" />
              <h4 className="mb-0">{`${offer.startup} / ${offer.location}`}</h4>
            </div>

            <div className="card p-4 mb-3">
              <h5>Product/Service for Sale:</h5>
              <p>{offer.product}</p>
              <h5>Descriptions (Sales pitch):</h5>
              <p>{offer.description}</p>
              <h5>Condition:</h5>
              <p>{offer.condition}</p>
              <h5>Price Range:</h5>
              <p>{offer.priceRange}</p>
              <h5>Type of Commission:</h5>
              <p>{offer.commissionType}</p>
              <h5>Commission:</h5>
              <p>{offer.commission}</p>
              <h5>Target Customers:</h5>
              <p>{offer.targetCustomers}</p>
              <h5>Sales Document:</h5>
              <button className="btn btn-outline-primary d-flex align-items-center mb-3" onClick={() => alert(`Downloading ${offer.document}`)}>
                <FaDownload className="me-2" />
                Click here to download it
              </button>
              <div className="d-flex gap-3 mt-3">
                <button className="btn btn-warning flex-grow-1" onClick={() => navigate(`/edit-offer/${offer.id}`)}>Edit Offer</button>
                <button className="btn btn-danger flex-grow-1" onClick={() => alert(`Offer ${offer.id} moved to archive.`)}>Send to Archive</button>
              </div>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary py-3 fw-bold" onClick={() => setShowApplications(prev => !prev)}>
                {showApplications ? 'Hide Candidatures' : 'Show Candidatures'}
              </button>
            </div>

            {showApplications && (
              <section className="mt-4">
                <h4>Candidatures</h4>
                <div className="list-group">
                  {applications.map(app => (
                    <div key={app.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-1">{app.name}</h5>
                        <span className={`badge ${getStatusBadgeClass(app.status)}`}>{app.status}</span>
                      </div>
                      <div className="mt-2 text-end">
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => toggleApplicationDetails(app.id)}>
                          {expandedApplicationId === app.id ? 'Masquer les détails' : 'Détails'}
                        </button>
                        {app.status === 'Pending' && (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() => handleEmailAction(app.id, app.email, 'Acceptation de votre candidature', `Bonjour ${app.name},\n\nNous avons le plaisir de vous informer que votre candidature a été acceptée.\n\nCordialement,\nL'équipe de recrutement.`, 'Approved')}
                            >
                              Accepter
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleEmailAction(app.id, app.email, 'Refus de votre candidature', `Bonjour ${app.name},\n\nNous regrettons de vous informer que votre candidature n'a pas été retenue.\n\nCordialement,\nL'équipe de recrutement.`, 'Rejected')}
                            >
                              Rejeter
                            </button>
                          </>
                        )}
                      </div>
                      {expandedApplicationId === app.id && (
                        <div className="mt-3">
                          <p><strong>Université:</strong> {app.university}</p>
                          <p><strong>Email:</strong> <a href={`mailto:${app.email}`}>{app.email}</a></p>
                          <p><strong>LinkedIn:</strong> <a href={app.linkedin} target="_blank" rel="noopener noreferrer">{app.linkedin}</a></p>
                          <p><strong>Secteur:</strong> {app.secteur}</p>
                          <p><strong>Diplôme:</strong> {app.diplome}</p>
                          <p><strong>Langues:</strong> {app.languages}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default DetailsOffer;