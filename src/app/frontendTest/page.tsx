// DashboardLayout.jsx
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Header section with logo */}
      <header className="dashboard-header">
        <div className="logo-container">
          <div className="logo">
            <span className="logo-dot"></span>
            <span className="logo-dot"></span>
            <span className="logo-dot"></span>
            <span className="logo-text">blackposition</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="main-content">
        <div className="tabs">
          <button className="tab active">My Ads</button>
        </div>
        
        <div className="cards-container">
          <div className="card">
            <div className="card-content">
              <span>New Lead Ads</span>
              <span className="arrow">→</span>
            </div>
          </div>
          
          <div className="card">
            <div className="card-content">
              <span>Sky Deck New Ads</span>
              <span className="arrow">→</span>
            </div>
          </div>
          
          <div className="card">
            <div className="card-content">
              <span>New Lead Ads</span>
              <span className="arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;