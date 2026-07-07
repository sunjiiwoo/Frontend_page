import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, PhoneCall, Search, Home, Sun, Moon } from 'lucide-react';

export default function Navbar({ cartCount, searchQuery, setSearchQuery, darkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-content">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" id="nav-brand-logo">
          Suriya<span>.in</span>
        </Link>

        {/* Search Bar */}
        <div className="navbar-search">
          <Search size={18} className="search-icon" />
          <input
            id="nav-search-input"
            type="text"
            placeholder="Search gadgets, fashion, food, sports, home, study..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Navigation items */}
        <nav className="navbar-nav">
          <Link to="/" className="navbar-link" id="nav-home-link">
            <Home size={18} />
            <span>Home</span>
          </Link>

          <Link to="/contact" className="navbar-link" id="nav-contact-link">
            <PhoneCall size={18} />
            <span>Helpline</span>
          </Link>

          <Link to="/cart" className="navbar-cart" id="nav-cart-link">
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="cart-count" id="nav-cart-badge">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Dark Mode Toggle */}
          <button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            id="dark-mode-toggle-btn"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            <span className="toggle-knob">
              {darkMode ? <Moon size={12} color="#a5b4fc" /> : <Sun size={12} color="#fbbf24" />}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
