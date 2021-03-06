import React    from 'react';
import { Link } from 'react-router-dom';

import { FiCompass, FiHome, FiMessageCircle } from 'react-icons/fi';
import './Navbar.scss';

function Navbar() {
  return <div className="Navbar">
    <div className="UtilContainer">
      <div className="Navbar__List">
        <Link className="Navbar__Brand" to="/">
          Instadark
        </Link>
      </div>
      <div className="Navbar__List Navbar__List--Center">
        (search here)
      </div>
      <div className="Navbar__List Navbar__List--Right">
        <Link className="Navbar__Link Navbar__Link--Active" to="/">
          <FiHome />
        </Link>
        <Link className="Navbar__Link" to="/">
          <FiMessageCircle />
        </Link>
        <Link className="Navbar__Link" to="/">
          <FiCompass />
        </Link>
      </div>
    </div>
  </div>;
}

export default Navbar;
