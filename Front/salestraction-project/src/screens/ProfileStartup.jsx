import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBars, FaTimes, FaLinkedin, FaCamera } from 'react-icons/fa';
import { useState, useRef } from 'react';

function ProfileStartup() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    sector: '',
    linkedin: '',
    description: '',
    logo: null,
    logoPreview: ''
  });
  const fileInputRef = useRef(null);

  const sectors = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'E-commerce',
    'Artificial Intelligence',
    'Green Energy'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: file,
          logoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/startup-dashboard');
  };

  // Vérifie si tous les champs requis sont remplis
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.date.trim() &&
      formData.sector &&
      formData.linkedin.trim() &&
      formData.description.trim() &&
      formData.logo
    );
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
              <a className="nav-link active" href="/profile-startup">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-danger" href="/login-startup">Logout</a>
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
            <h3 className="mb-0">STARTUP</h3>
          </div>
          
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} style={{ 
          marginLeft: showMenu ? '250px' : '0', 
          transition: 'margin 0.3s ease',
          padding: '0 15px'
        }}>
          <div className="mb-4 text-start">
            {/* Logo Upload Circle */}
            <div className="d-flex justify-content-center mb-4">
              <div 
                onClick={triggerFileInput}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f9fa',
                  border: '2px dashed #adb5bd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {formData.logoPreview ? (
                  <img 
                    src={formData.logoPreview} 
                    alt="Logo Preview" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <FaCamera size={24} className="mb-2" />
                    <div>Add Logo</div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Enter your Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Startup name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Enter Your email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="contact@startup.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">Creation date</label>
              <input
                type="text"
                id="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sector" className="form-label">Sector</label>
              <select
                id="sector"
                className="form-select"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                required
              >
                <option value="">Select your sector</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="linkedin" className="form-label d-flex align-items-center">
                <FaLinkedin className="me-2" /> LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                className="form-control"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/your-startup"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                className="form-control"
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe your startup (mission, vision, products/services)"
              ></textarea>
            </div>

            <div className="d-grid">
              <button 
                type="submit" 
                className="btn btn-primary py-3 fw-bold"
                disabled={!isFormValid()}
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileStartup;
