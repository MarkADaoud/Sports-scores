import React from "react";
import { Link } from "react-router-dom";
import "./App.css"; 

function Header() {
  return (
    <header className="nav-header">
      <div className="nav-title">
        <h>Sports Model Predictions</h>
      </div>
      <nav className="nav-links">
        <Link to="/nfl">NFL</Link>
        <Link to="/mlb">MLB</Link>
        <Link to="/nba">NBA</Link>
        <Link to="/wnba">WNBA</Link>
        <Link to="/cfb">CFB</Link>
      </nav>
    </header>
  );
}

export default Header;
