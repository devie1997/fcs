import "./footer.css";
import logo from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logo} alt="FCS Logo" className="footer-logo" />
          <p>Fresh, Quality Spices & Herbs.</p>
        </div>

        <div className="footer-socials">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} FCS. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
