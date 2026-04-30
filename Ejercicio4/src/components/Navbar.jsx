import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          R6<span>Data</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-item">Inicio</Link>
          <Link to="/items" className="nav-item">Operadores</Link>
        </div>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
