import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

function AddOffers() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    condition: '',
    priceRange: '',
    commissionType: '',
    commission: '',
    targetCustomers: '',
    acceptTerms: false
  });

  const conditions = ['Success', 'Pending'];
  const commissionTypes = ['Percentage', 'Fixed'];
  const targetCustomerTypes = ['Individuals', 'Businesses', 'Both'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    
    console.log('Form submitted:', formData);
    navigate('/offers');
  };

  return (
    <div className="centered-page">
      <div className="card position-relative">
        {/* Sidebar - Même style que dans ShowOffers */}
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
              <a className="nav-link active" href="/add-offer">Add offers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="archive-offer">Archive</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile-startup">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-danger" href="/startup-login">Logout</a>
            </li>
          </ul>
        </div>

        {/* Header - Même style que dans ShowOffers */}
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

        {/* Formulaire - Avec la même marge que dans ShowOffers */}
        <form onSubmit={handleSubmit} noValidate style={{ 
          marginLeft: showMenu ? '250px' : '0', 
          transition: 'margin 0.3s ease',
          padding: '0 15px'
        }}>
          <div className="mb-4 text-start">
            <h2 className="mb-3 text-center">Product / Service for sale</h2>
            
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Offer Title
              </label>
              <input 
                id="title"
                type="text" 
                className="form-control" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter offer title"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="form-label h5 mb-2">
                Descriptions (Sales pitch)
              </label>
              <textarea 
                id="description"
                className="form-control" 
                rows="5" 
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter detailed description of your product/service"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="condition" className="form-label d-flex align-items-center">
                Status 
              </label>
              <select 
                id="condition"
                className="form-select"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="">Select status</option>
                {conditions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="priceRange" className="form-label">
                Price range
              </label>
              <input 
                id="priceRange"
                type="text" 
                className="form-control" 
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                required
                placeholder="e.g. $100 - $200"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="commissionType" className="form-label d-flex align-items-center">
                Type of commission 
              </label>
              <select 
                id="commissionType"
                className="form-select"
                name="commissionType"
                value={formData.commissionType}
                onChange={handleChange}
                required
              >
                <option value="">Select commission type</option>
                {commissionTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'Percentage' ? 'Percentage' : 'Fixed amount'}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="commission" className="form-label">
                Commission {formData.commissionType === 'Percentage' ? '(%)' : '($)'}
              </label>
              <input 
                id="commission"
                type="number" 
                className="form-control" 
                name="commission"
                value={formData.commission}
                onChange={handleChange}
                required
                min="0"
                step={formData.commissionType === 'Percentage' ? '0.1' : '1'}
                placeholder={formData.commissionType === 'Percentage' ? 'e.g. 5%' : 'e.g. $50'}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="targetCustomers" className="form-label d-flex align-items-center">
                Target customers 
              </label>
              <select 
                id="targetCustomers"
                className="form-select"
                name="targetCustomers"
                value={formData.targetCustomers}
                onChange={handleChange}
                required
              >
                <option value="">Select target customers</option>
                {targetCustomerTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-check mb-4">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="acceptTerms">
                By checking this box, you accept the general terms and conditions of the platform
              </label>
            </div>

            <div className="d-grid">
              <button 
                type="submit" 
                className="btn btn-primary py-3 fw-bold"
                disabled={!formData.acceptTerms}
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

export default AddOffers;