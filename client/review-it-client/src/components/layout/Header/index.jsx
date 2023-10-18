import { Link } from "react-router-dom";
import * as styles from "./index.css";

import { BiSolidSearch } from "react-icons/bi";

const Header = ({ user, logout }) => {
  //  GET A CUSTOM SAYING :)
  const getRandomGreeting = () => {
    const greetingsArray = [
      "Hello",
      "Hello There",
      "G'Day",
      "Howdy",
      "Yo!",
      "What's Happening",
    ];
    const random = Math.floor(Math.random() * greetingsArray.length);
    return greetingsArray[random]
  };
  return (
    <header className={styles.header}>
      <div className={styles.displayName}>
        <Link to="/" > {user ? <p >{getRandomGreeting()} {user.displayName}</p> : ""}</Link>
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
          {user ? (
            <>
              <li>
                <Link to={`/profile/${user._id}`}>My Profile</Link>
              </li>
              <button onClick={logout}>log out</button>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}

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
