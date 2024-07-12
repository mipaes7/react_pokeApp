import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return <nav className="nav">
  {/* <input type="checkbox" id="menu" /> */}
  {/* <label htmlFor="menu"><img src={`${burgerIcon}`} alt="burger" width="24px" /></label> */}
  <ul>
    <li className="linkNav">
      <Link to="/">Home</Link>
    </li>
    <li className="linkNav">
      <Link to="/new">Create New Pokémon</Link>
    </li>
  </ul>
</nav>;
};

export default Nav;
