import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

function ContactTalent() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [object, setObject] = useState('');
  const [message, setMessage] = useState('');

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

        {/* Contact Content */}
        <div style={{ 
          marginLeft: showMenu ? '250px' : '0', 
          transition: 'margin 0.3s ease',
          padding: '0 15px'
        }}>
          <div className="mb-4 text-center">
            <h2 className="mb-4">Contact Us</h2>
            
            <div className="card p-4 mb-4">
              <div className="mb-3">
                <label htmlFor="object" className="form-label d-block text-start">
                  Object:
                </label>
                <input
                  type="text"
                  id="object"
                  className="form-control"
                  value={object}
                  onChange={(e) => setObject(e.target.value)}
                  placeholder="Subject of your message"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="form-label d-block text-start">
                  Type your message:
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              
              <div className="d-grid">
                <button 
                  className="btn btn-primary py-2"
                  onClick={() => {
                    if (!object || !message) {
                      alert('Please fill in both object and message fields');
                    } else {
                      alert(`Message sent!\nObject: ${object}\nMessage: ${message}`);
                    }
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
            
            <div className="text-muted">
              <p className="mb-2">Or contact us on:</p>
              <div className="d-flex align-items-center justify-content-center mb-2">
                <FaPhone className="me-2" />
                <span>Phone number: +33 0000000000</span>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <FaEnvelope className="me-2" />
                <a href="mailto:example@gmail.com" className="text-decoration-none">
                  Email: example@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactTalent;