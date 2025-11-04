import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./navBar.css";
import logo from "../assets/logo.png";
import CartIcon from "./CartIcon";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav ref={menuRef}>
      <div className="header">
        <div className="menu-container">
          <div
            className={`bar-container ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
          </div>

          <img src={logo} alt="FCS logo" className="logo" />
        </div>

        <ul className="ul-desktop">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/spices">Spices</Link></li>
          <li><Link to="/herbs">Herbs</Link></li>
          <li><Link to="/Seasonings">Seasonings</Link></li>
          <li><Link to="/add-new-product">Add New Product</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
        <CartIcon />
      </div>

      {/* Mobile Menu */}
      <ul id="ul-mobile" className={menuOpen ? "menu-open" : ""}>
        <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/spices" onClick={() => setMenuOpen(false)}>Spices</Link></li>
        <li><Link to="/herbs" onClick={() => setMenuOpen(false)}>Herbs</Link></li>
        <li><Link to="/seasonings" onClick={() => setMenuOpen(false)}>Seasonings</Link></li>
        <li><Link to="/addProduct" onClick={() => setMenuOpen(false)}>Add New Product</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
      </ul>
    </nav>
  );
}
