import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from './../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from './../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, setToken, food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  // 🔍 Search states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // ✅ Active menu detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const sections = [
        { id: 'explore-menu', name: 'menu' },
        { id: 'app-download', name: 'mobile-app' },
        { id: 'footer', name: 'contact-us' },
      ];

      let activeSection = 'home';

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            activeSection = section.name;
            break;
          }
        }
      }

      setMenu(activeSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Smooth scroll handler
  const handleScrollTo = (id, name) => {
    setMenu(name);
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  // 🔍 Toggle search input visibility
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setSearchTerm('');
    setFilteredItems([]);
  };

  // 🔍 Search handler
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredItems([]);
      return;
    }

    const results = food_list.filter((item) =>
      (item.name || item.title || '').toLowerCase().includes(term)
    );

    setFilteredItems(results);
  };

  return (
    <div className='navbar'>
      {/* Logo */}
      <a href="#top" onClick={() => setMenu('home')}>
        <img src={assets.logo} alt="Foodify Logo" className="logo" />
      </a>

      {/* Menu */}
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
          home
        </Link>
        <a onClick={() => handleScrollTo('explore-menu', 'menu')} className={menu === 'menu' ? 'active' : ''}>
          menu
        </a>
        <a onClick={() => handleScrollTo('app-download', 'mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>
          mobile-app
        </a>
        <a onClick={() => handleScrollTo('footer', 'contact-us')} className={menu === 'contact-us' ? 'active' : ''}>
          contact us
        </a>
      </ul>

      {/* Right side */}
      <div className="navbar-right">
        {/* 🔍 Search icon */}
        <img
          src={assets.search_icon}
          alt="Search"
          className="navbar-search-icon-img"
          onClick={toggleSearch}
        />

        {searchOpen && (
          <div className="navbar-search-box">
            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={handleSearch}
              autoFocus
            />

            {filteredItems.length > 0 && (
              <div className="navbar-search-results">
                {filteredItems.map((item) => (
                  <div
                    key={item._id}
                    className="navbar-search-item"
                    onClick={() => {
                      navigate(`/menu/${item.category || 'all'}`);
                      toggleSearch();
                    }}
                  >
                    🍽️ {item.name || item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
