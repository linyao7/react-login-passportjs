import React, { useContext } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import routes from './routes';
import { API_URL } from './consts';
import { AuthContext } from './';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    window.open(`${API_URL}/auth/logout`, '_self');
  };

  const user = useContext(AuthContext);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-links">
        <p onClick={() => navigate(routes['home'].getRoute())}>
          <a>Home</a>
        </p>
        <p onClick={() => navigate(routes['info'].getRoute())}>
          <a>Info</a>
        </p>
      </div>
      <p>
        {!user && <button onClick={() => navigate(routes['login'].getRoute())}>Login</button>}
        {user && <button onClick={logout}>Logout</button>}
      </p>
    </div>
  );
};

export default Navbar;
