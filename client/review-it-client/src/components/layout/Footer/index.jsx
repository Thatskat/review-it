import * as styles from "./index.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return <footer className={styles.footer}>
    <div></div>
    <div>
      <h4>Find out more</h4>
      <Link to="/about">About Us</Link>
      <Link to="/contact">Contact Us</Link>
      <Link to="/privacy-policy">Privacy Policy</Link>
      <Link to="/terms-conditions">Terms & Conditions</Link>
    </div>
    <div>
      <h4>Site links</h4>
      <Link to="/">Home</Link>
      <Link to="/shows">Contact Us</Link>
      <Link to="/privacy-policy">Privacy Policy</Link>
      <Link to="/terms-conditions">Terms & Conditions</Link>
    </div>
    <div>
      <h4>Follow Us</h4>
      <a href="#" target="_blank" rel="noreferrer">Instagram</a>
      <a href="#" target="_blank" rel="noreferrer">Facebook</a>
      <a href="#" target="_blank" rel="noreferrer">X</a>
    </div>
  </footer>;
};

export default Footer;
