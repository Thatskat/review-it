import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">Logo</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shows">Tv Shows</Link>
          </li>
          <li>
            <Link to="/lists">Lists</Link>
          </li>
          <li>
            <Link to="/signup">Create an Account</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
          <li>
            <button>Log Out</button>
          </li>

        </ul>
      </nav>
      <div>Search</div>
    </header>
  );
};

export default Header;
