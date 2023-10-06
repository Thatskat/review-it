import { Link } from "react-router-dom";
import * as styles from "./index.css";

import { BiSolidSearch } from "react-icons/bi";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <Link to="/">R{/* SITE LOGO */}</Link>
      </div>
      <div className="navLinks">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shows">Tv Shows</Link>
          </li>
          <li>
            <Link to="/shows/trending">Trending Shows</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/" title="search">
              <BiSolidSearch />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
