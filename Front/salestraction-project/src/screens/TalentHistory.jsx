import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBars, FaTimes, FaSearch, FaCoins, FaListUl } from 'react-icons/fa';
import { useState } from 'react';

function TalentHistory() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const offers = [
    { id: 1, title: "Mobile App Development", startup: "Tech Innovators", location: "Paris", commission: "€50", status: "completed", date: "15/06/2023", logo: "https://ui-avatars.com/api/?name=Tech+Innovators&background=random" },
    { id: 2, title: "E-commerce Website", startup: "Digital Solutions", location: "Lyon", commission: "€120", status: "pending", date: "22/06/2023", logo: "https://ui-avatars.com/api/?name=Digital+Solutions&background=random" },
    { id: 3, title: "SaaS CRM Solution", startup: "Future Tech", location: "Marseille", commission: "€85", status: "completed", date: "05/07/2023", logo: "https://ui-avatars.com/api/?name=Future+Tech&background=random" },
    { id: 4, title: "Website Redesign", startup: "Web Masters", location: "Toulouse", commission: "€65", status: "completed", date: "12/07/2023", logo: "https://ui-avatars.com/api/?name=Web+Masters&background=random" },
    { id: 5, title: "Management Application", startup: "App Creators", location: "Nice", commission: "€95", status: "in-progress", date: "18/07/2023", logo: "https://ui-avatars.com/api/?name=App+Creators&background=random" }
  ];

  const totalCommissions = offers
    .filter(o => o.status === "completed")
    .reduce((sum, o) => sum + parseInt(o.commission.substring(1)), 0);

  const completedOffers = offers.filter(o => o.status === "completed").length;

  const filteredOffers = offers
    .filter(o =>
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.startup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Highest Commission") return parseInt(b.commission.substring(1)) - parseInt(a.commission.substring(1));
      if (sortOption === "Lowest Commission") return parseInt(a.commission.substring(1)) - parseInt(b.commission.substring(1));
      if (sortOption === "Newest") return new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-'));
      if (sortOption === "Oldest") return new Date(a.date.split('/').reverse().join('-')) - new Date(b.date.split('/').reverse().join('-'));
      return 0;
    });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="badge bg-success bg-opacity-10 text-success">Completed</span>;
      case 'in-progress':
        return <span className="badge bg-warning bg-opacity-10 text-warning">In Progress</span>;
      case 'pending':
        return <span className="badge bg-secondary bg-opacity-10 text-secondary">Pending</span>;
      default:
        return <span className="badge bg-light text-dark">Unknown</span>;
    }
  };

  return (
    <div className="centered-page">
      <div className="card position-relative">
        {/* Sidebar */}
        <div className={`sidebar bg-light p-3 shadow ${showMenu ? 'd-block' : 'd-none'}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '250px',
            zIndex: 100
          }}>
          <button onClick={() => setShowMenu(false)} className="btn btn-close mb-3"></button>
          <h5>Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item"><a className="nav-link" href="/talent-show-offer">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/talent-history">History</a></li>
            <li className="nav-item"><a className="nav-link" href="/profile-talent">Profile</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
            <li className="nav-item"><a className="nav-link text-danger" href="/startup-login">Logout</a></li>
          </ul>
        </div>

        {/* Header */}
        <div className="d-flex align-items-center mb-4" style={{ marginLeft: showMenu ? '250px' : '0', transition: 'margin 0.3s ease' }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="btn btn-outline-primary me-2 p-2 d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          >
            {showMenu ? <FaTimes className="m-0" /> : <FaBars className="m-0" />}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-primary me-3 p-2 d-flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          >
            <FaArrowLeft className="m-0" />
          </button>
          <div className="text-center flex-grow-1">
            <h1 className="mb-1">SALESTRACTION</h1>
          </div>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Statistiques */}
        <div className="row mb-4 g-3" style={{ marginLeft: showMenu ? '250px' : '0', transition: 'margin 0.3s ease' }}>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                  <FaListUl size={24} className="text-primary" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Completed Offers</h6>
                  <h3 className="mb-0 fw-bold">{completedOffers}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body d-flex align-items-center">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                  <FaCoins size={24} className="text-success" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Commissions</h6>
                  <h3 className="mb-0 fw-bold">€{totalCommissions}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="card mb-4" style={{ marginLeft: showMenu ? '250px' : '0', transition: 'margin 0.3s ease' }}>
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row gap-3">
              <select className="form-select" style={{ width: '150px' }} value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="">Sort by</option>
                <option value="Highest Commission">Highest Commission</option>
                <option value="Lowest Commission">Lowest Commission</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
              <div className="flex-grow-1">
                <div className="input-group" style={{ height: '38px' }}>
                  <span className="input-group-text d-flex align-items-center justify-content-center h-100"><FaSearch size={16} /></span>
                  <input
                    type="text"
                    className="form-control h-100"
                    placeholder="Search offers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des offres */}
        <div className="card" style={{ marginLeft: showMenu ? '250px' : '0', transition: 'margin 0.3s ease' }}>
          <div className="card-body p-0">
            <div className="list-group list-group-flush text-start">
              {filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="list-group-item border-0 p-3 hover-effect"
                  onClick={() => navigate(`/offer/${offer.id}`)}
                >
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div className="d-flex align-items-center gap-3 flex-grow-1">
                      <img
                        src={offer.logo}
                        alt={`${offer.startup} logo`}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h5 className="mb-0 fw-bold">{offer.title}</h5>
                          {getStatusBadge(offer.status)}
                        </div>
                        <p className="mb-0 text-muted"><span className="fw-medium">{offer.startup}</span> • {offer.location}</p>
                        <small className="text-muted">{offer.date}</small>
                      </div>
                    </div>
                    <div className="text-md-end">
                      <h4 className="mb-0 text-primary fw-bold">{offer.commission}</h4>
                      <small className="text-muted">Commission</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalentHistory;
