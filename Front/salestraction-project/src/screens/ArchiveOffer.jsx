import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaMapMarkerAlt, FaBars, FaTimes, FaBuilding } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function ArchiveOffers() {
  const navigate = useNavigate();
  const [prevPage, setPrevPage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const referrer = document.referrer;
    if (referrer.includes("talent-login")) setPrevPage("Talent Login");
    else if (referrer.includes("startup-login")) setPrevPage("Startup Login");
    else if (referrer.includes("startup-signup")) setPrevPage("Startup Sign Up");
    else if (referrer.includes("talent-signup")) setPrevPage("Talent Sign Up");
    else if (referrer.includes("forget-password")) setPrevPage("Forgot Password");
    else if (referrer.includes("verify-otp")) setPrevPage("Verify OTP");
    else setPrevPage("Home");
  }, []);

  // Tableau d'offres avec les chemins des logos
  const offers = [
    { 
      id: 1, 
      title: "Développeur Fullstack", 
      company: "TechStart Inc.", 
      location: "Paris", 
      logo: "https://img.icons8.com/color/48/000000/development-skill.png" 
    },
    { 
      id: 2, 
      title: "Commercial B2B", 
      company: "SalesForce", 
      location: "Lyon", 
      logo:"https://img.icons8.com/color/48/000000/salesforce.png"
    },
    { 
      id: 3, 
      title: "Product Manager", 
      company: "Innovatech", 
      location: "Marseille", 
      logo: "https://img.icons8.com/color/48/000000/development-skill.png" 
    },
    { 
      id: 4, 
      title: "UX Designer", 
      company: "DigitalCreations", 
      location: "Toulouse", 
      logo: "https://img.icons8.com/color/48/000000/salesforce.png"
    },
    { 
      id: 5, 
      title: "Data Scientist", 
      company: "AI Solutions", 
      location: "Bordeaux", 
      logo: "https://img.icons8.com/color/48/000000/artificial-intelligence.png"
    }
  ];

  const filteredOffers = offers
    .filter(offer => 
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Newest") return b.id - a.id;
      if (sortOption === "Location") return a.location.localeCompare(b.location);
      return 0;
    });

  return (
    <div className="centered-page">
      <div className="card position-relative">
        {/* Sidebar intégrée dans la card */}
        <div className={`sidebar bg-light p-3 shadow ${showMenu ? 'd-block' : 'd-none'}`} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '250px',
            zIndex: 100
          }}>
          <button 
            onClick={() => setShowMenu(false)}
            className="btn btn-close mb-3"
          ></button>
          <h5>Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="/offers">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/add-offer">Add offers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/archive-offer">Archive</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile-startup">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link  text-danger" href="/startup-login">Logout</a>
            </li>
          </ul>
        </div>

        {/* Header */}
        <div className="d-flex align-items-center mb-4" style={{ marginLeft: showMenu ? '250px' : '0', transition: 'margin 0.3s ease' }}>
          <button 
            onClick={() => setShowMenu(!showMenu)} 
            className="btn btn-outline-primary me-2 p-2 d-flex align-items-center justify-content-center"
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%'
            }}
          >
            {showMenu ? <FaTimes className="m-0" /> : <FaBars className="m-0" />}
          </button>
          
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-outline-primary me-3 p-2 d-flex align-items-center justify-content-center"
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%'
            }}
          >
            <FaArrowLeft className="m-0" />
          </button>
          
          <div className="text-center flex-grow-1">
            <h1 className="mb-1">SALESTRACTION</h1>
          </div>
          
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Filters */}
        <div className="d-flex flex-column flex-md-row gap-3 mb-4" style={{ marginLeft: showMenu ? '250px' : '0', transition: 'margin 0.3s ease' }}>
          <div style={{ width: '150px' }}>
            <select 
              className="form-select h-100"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="Newest">Newest</option>
              <option value="Most Relevant">Most Relevant</option>
              <option value="Location">Location</option>
            </select>
          </div>
          <div className="flex-grow-1">
            <div className="input-group" style={{ height: '38px' }}>
              <span className="input-group-text d-flex align-items-center justify-content-center h-100">
                <FaSearch size={16} />
              </span>
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

        {/* Offers List */}
        <div className="row row-cols-1 row-cols-md-2 g-4" style={{ marginLeft: showMenu ? '250px' : '0', transition: 'margin 0.3s ease' }}>
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body position-relative text-start">
                  <div className="d-flex align-items-start mb-3">
                    {/* Logo de l'entreprise */}
                    <div className="me-3">
                      {offer.logo ? (
                        <img 
                          src={offer.logo} 
                          alt={`${offer.company} logo`} 
                          className="rounded" 
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = (
                              <div className="d-flex align-items-center justify-content-center bg-secondary text-white rounded" 
                                   style={{ width: '50px', height: '50px' }}>
                                <FaBuilding size={20} />
                              </div>
                            );
                          }}
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center bg-secondary text-white rounded" 
                             style={{ width: '50px', height: '50px' }}>
                          <FaBuilding size={20} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1">{offer.title}</h5>
                      <p className="card-text text-muted mb-2">{offer.company}</p>
                      <div className="d-flex align-items-center text-muted">
                        <FaMapMarkerAlt className="me-2 text-danger" />
                        <small>{offer.location}</small>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary w-100 mt-2">Apply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArchiveOffers;