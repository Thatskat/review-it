import * as styles from "./index.css";
import { Link } from "react-router-dom";

import { AiFillInstagram, AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div></div>
      <div>
        <h4>Find out more</h4>
        <ul>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            {" "}
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            {" "}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            {" "}
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </li>
        </ul>
      </div>
      <div>
        <h4>Site links</h4>
        <ul>
          <li>
            {" "}
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shows">Shows</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
          <Link to="/terms-conditions">Terms & Conditions</Link>
          <li></li>
        </ul>
      </div>
      <div>
        <h4>Follow Us</h4>
        <ul>
          <li>
            {" "}
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" title="instagram">
              <AiFillInstagram />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" title="facebook">
             <AiFillFacebook />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" title="twitter">
              <AiFillTwitterSquare />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
