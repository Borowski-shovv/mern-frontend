import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOption';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <Link className="title" to="/">
        <h2>reportsSHOVV</h2>
      </Link>
      <AuthOptions />
    </div>
  );
}

export default Header;
