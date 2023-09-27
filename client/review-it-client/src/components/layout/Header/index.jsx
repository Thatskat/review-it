import { Link } from "react-router-dom";
import * as styles from "./index.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <Link to="/">Logo</Link>
      </div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/" title="Home">Home</Link>
          </li>
          <li>
            <Link to="/shows" title="TV Shows">TV Shows</Link>
          </li>
          <li>
            <Link to="/lists" title="Lists">Lists</Link>
          </li>
          <li>
            <Link to="/signup" title="Create an Account">Create an Account</Link>
          </li>
          <li>
            <Link to="/login" title="Login">Login</Link>
          </li>
          {/* <li>
            <Link to="/profile" title="My Profile">My Profile</Link>
          </li>
          <li>
            <button>Log Out</button>
          </li> */}
        </ul>
      </nav>
      <div className={styles.searchBox}>
        <label htmlFor="searchBox">Search</label>
        <input type="text" placeholder="Search" id="searchBox"/>
      </div>
    </header>
  );
};

export default Header;
