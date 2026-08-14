import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/upload" className="navbar__brand">
        <span className="navbar__dot" />
        Career Compass
      </Link>

      {user && (
        <div className="navbar__right">
          <Link to="/dashboard" className="navbar__link">Dashboard</Link>
          <span className="navbar__user">{user.name}</span>
          <button onClick={handleLogout} className="navbar__logout">
            Log out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;