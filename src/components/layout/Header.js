import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOption';
import './Header.css';
import Logo from '../../assets/logo.png';

function Header() {
  return (
    <div className="header">
      <Link className="title" to="/">
        <img src={Logo} alt="shovv-logo"/>
      </Link>
      <AuthOptions />
    </div>
  );
}

export default Header;
