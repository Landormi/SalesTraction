import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBars, FaTimes, FaLinkedin, FaGraduationCap } from 'react-icons/fa';
import { useState } from 'react';

function ProfileTalent() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    university: '',
    diploma: '',
    languages: [],
    linkedin: ''
  });

  const languageOptions = ['English', 'French', 'Spanish', 'German', 'Arabic', 'Other'];
  const diplomaOptions = ['High School', 'Bachelor', 'Master', 'PhD', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageToggle = (language) => {
    setFormData(prev => {
      const newLanguages = prev.languages.includes(language)
        ? prev.languages.filter(lang => lang !== language)
        : [...prev.languages, language];
      
      return {
        ...prev,
        languages: newLanguages
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/talent-dashboard');
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
              <a className="nav-link" href="/talent-show-offer">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/talent-history">History</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile-talent">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact-talent">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link  text-danger" href="/talent-login">Logout</a>
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

        {/* Profile Form */}
        <form onSubmit={handleSubmit} style={{ 
          marginLeft: showMenu ? '250px' : '0', 
          transition: 'margin 0.3s ease',
          padding: '0 15px'
        }}>
          <div className="mb-4 text-start">
            <h2 className="mb-3 text-center">Talent Profile</h2>
            
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
                placeholder="Your full name"
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
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="birthDate" className="form-label">Date of Birth</label>
              <input
                type="text"
                id="birthDate"
                className="form-control"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="university" className="form-label">Enter your University</label>
              <input
                type="text"
                id="university"
                className="form-control"
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
                placeholder="University name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="diploma" className="form-label">Enter Your Diploma</label>
              <select
                id="diploma"
                className="form-select"
                name="diploma"
                value={formData.diploma}
                onChange={handleChange}
                required
              >
                <option value="">Select your diploma level</option>
                {diplomaOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Languages</label>
              <div className="d-flex flex-wrap gap-2">
                {languageOptions.map(lang => (
                  <button
                    key={lang}
                    type="button"
                    className={`btn btn-sm ${formData.languages.includes(lang) ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleLanguageToggle(lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="linkedin" className="form-label">LinkedIn Profile</label>
              <input
                type="url"
                id="linkedin"
                className="form-control"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div className="d-grid mt-4">
              <button 
                type="submit" 
                className="btn btn-primary py-3 fw-bold"
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

export default ProfileTalent;