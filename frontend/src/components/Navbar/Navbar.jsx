// import React, { useContext, useState, useEffect } from "react";
// import "./Navbar.css";
// import { Link, useNavigate } from "react-router-dom";
// import { StoreContext } from "../context/StoreContext";
// import logo from "../../assets/logo.png";
// import search_icon from "../../assets/search_icon.png";
// import cart_icon from "../../assets/basket_icon.png";
// import { IoClose } from "react-icons/io5";
// import { assets } from "../../assets/assets";

// const Navbar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("home");
//    // 🔍 Search states
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredItems, setFilteredItems] = useState([]);

//   const { cartItems, food_list, setToken } = useContext(StoreContext);
//   const navigate = useNavigate();

//   // 🧠 Handle search input
//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     if (term.trim() === "") {
//       setFilteredItems([]);
//       return;
//     }

//     const results = food_list.filter((item) =>
//       item.name.toLowerCase().includes(term)
//     );
//     setFilteredItems(results);
//   };

//   // 🧭 When user selects a food item
//   const handleSearchSelect = (id) => {
//     navigate(`/`);
//     setShowSearch(false);
//     setSearchTerm("");
//   };

//   // 🚪 Logout function
//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     navigate("/");
//   };

//   const totalCartCount = Object.values(cartItems || {}).reduce(
//     (a, b) => a + b,
//     0
//   );

//   // 🌐 Smooth scroll to sections
//   const handleScrollTo = (id, name) => {
//     setMenu(name);
//     const section = document.getElementById(id);
//     if (section) {
//       window.scrollTo({
//         top: section.offsetTop - 80,
//         behavior: "smooth",
//       });
//     }
//   };

//   // 🚫 Disable background scroll when search box open
//   useEffect(() => {
//     if (showSearch) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [showSearch]);

//   return (
//     <div className="navbar">
//       {/* Logo */}
//       <Link to="/">
//         <img src={logo} alt="Foodify Logo" className="logo" />
//       </Link>

//       {/* Menu */}
//       <ul className="navbar-menu">
//         <Link
//           to="/"
//           onClick={() => setMenu("home")}
//           className={menu === "home" ? "active" : ""}
//         >
//           home
//         </Link>
//         <a
//           onClick={() => handleScrollTo("explore-menu", "menu")}
//           className={menu === "menu" ? "active" : ""}
//         >
//           menu
//         </a>
//         <a
//           onClick={() => handleScrollTo("app-download", "mobile-app")}
//           className={menu === "mobile-app" ? "active" : ""}
//         >
//           mobile-app
//         </a>
//         <a
//           onClick={() => handleScrollTo("footer", "contact-us")}
//           className={menu === "contact-us" ? "active" : ""}
//         >
//           contact us
//         </a>
//       </ul>

//       {/* Right Section */}
//       <div className="navbar-right">
//         {/* Search Icon */}
//         <div
//           className="navbar-search-icon"
//           onClick={() => setShowSearch(!showSearch)}
//         >
//           <img
//             src={search_icon}
//             alt="search"
//             className="navbar-search-icon-img"
//           />
//         </div>

//         {/* Cart */}
//         <div className="navbar-search-icon" onClick={() => navigate("/cart")}>
//           <img src={cart_icon} alt="cart" />
//           {totalCartCount > 0 && <div className="dot"></div>}
//         </div>

//         {/* Profile */}
//         {localStorage.getItem("token") && (
//           <div className="navbar-profile">
//             <img src={assets.profile_icon} alt="Profile" />
//             <ul className="nav-profile-dropdown">
//               <li onClick={() => navigate("/myorders")}>
//                 <img src={assets.bag_icon} alt="Orders" />
//                 <p>Orders</p>
//               </li>
//               <hr />
//               <li onClick={logout}>
//                 <img src={assets.logout_icon} alt="Logout" />
//                 <p>Logout</p>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Sign In */}
//         {!localStorage.getItem("token") && (
//           <button onClick={() => setShowLogin(true)}>Sign In</button>
//         )}
//       </div>

//       {/* =====================
//           🔍 Search Overlay
//       ===================== */}
//       {showSearch && (
//         <div
//           className="navbar-search-box"
//           onClick={(e) => e.stopPropagation()} // Prevent background click
//         >
//           <IoClose
//             className="navbar-close-search"
//             onClick={() => setShowSearch(false)}
//           />

//           <input
//             type="text"
//             placeholder="Search for food..."
//             value={searchTerm}
//             onChange={handleSearch}
//             autoFocus
//           />

//           <div className="navbar-search-results">
//             {filteredItems.length > 0 ? (
//               filteredItems.map((item) => (
//                 <div
//                   key={item._id}
//                   className="navbar-search-item"
//                   onClick={() => handleSearchSelect(item._id)}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="search-item-thumb"
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                       borderRadius: "6px",
//                       objectFit: "cover",
//                     }} // ✅ smaller thumbnails
//                   />
//                   <div className="search-item-right">
//                     <div className="search-item-name">{item.name}</div>
//                     <div className="search-item-meta">
//                       ₹{item.price} • {item.category}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : searchTerm.trim() ? (
//               <p
//                 style={{
//                   textAlign: "center",
//                   color: "#666",
//                   marginTop: "10px",
//                 }}
//               >
//                 No items found
//               </p>
//             ) : null}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

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

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  // Detect active menu section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'top', name: 'home' },
        { id: 'explore-menu', name: 'menu' },
        { id: 'app-download', name: 'mobile-app' },
        { id: 'footer', name: 'contact-us' },
      ];
      let activeSection = 'home';
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (let section of sections) {
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

  const handleScrollTo = (id, name) => {
    setMenu(name);
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
    }
  };

  // Toggle Search
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setSearchTerm('');
    setFilteredItems([]);
  };

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredItems([]);
      return;
    }
    const results = (food_list || []).filter((item) =>
      (item.name || item.title || '').toLowerCase().includes(term)
    );
    setFilteredItems(results);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const q = searchTerm.trim();
      if (q.length === 0) return;
      navigate(`/search?q=${encodeURIComponent(q)}`);
      toggleSearch();
    }
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <a href="#top" onClick={() => setMenu('home')}>
        <img src={assets.logo} alt="Foodify Logo" className="logo" />
      </a>

      {/* Menu */}
      <ul className="navbar-menu">
        <a onClick={() => handleScrollTo('explore-menu', 'menu')} className={menu === 'menu' ? 'active' : ''}>menu</a>
        <a onClick={() => handleScrollTo('app-download', 'mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>mobile-app</a>
        <a onClick={() => handleScrollTo('footer', 'contact-us')} className={menu === 'contact-us' ? 'active' : ''}>contact us</a>
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

        {/* 🔍 Search Box */}
        {searchOpen && (
          <div className="navbar-search-box">
            <span className="navbar-close-search" onClick={toggleSearch}>✕</span>
            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleSearchKeyDown}
              autoFocus
            />
            {filteredItems.length > 0 && (
              <div className="navbar-search-results">
                {filteredItems.map((item) => (
                  <div
                    key={item._id}
                    className="navbar-search-item"
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(item.name || item.title || '')}`);
                      toggleSearch();
                    }}
                  >
                    <img
                      src={item.image || assets.placeholder_img}
                      alt={item.name}
                      className="search-item-thumb"
                    />
                    <div>
                      <div className="search-item-name">🍽️ {item.name || item.title}</div>
                      <div className="search-item-meta">{item.category || 'Other'} • ₹{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 🛒 Cart icon */}
<div className="navbar-cart-wrapper">
  <Link to="/cart" className="navbar-cart-link">
    <img src={assets.basket_icon} alt="Cart" />
    {getTotalCartAmount() > 0 && <span className="cart-dot"></span>}
  </Link>
</div>


        {/* 👤 Profile / Login */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
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
