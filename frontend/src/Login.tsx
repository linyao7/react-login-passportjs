import React from 'react';
import './Login.css';
import { API_URL } from './consts';

const Login = () => {
  const handleGoogleLogin = () => {
    window.open(`${API_URL}/auth/google`, '_self');
  };

  const handleFacebookLogin = async () => {
    window.open(`${API_URL}/auth/facebook`, '_self');
  };

  const handleGithubLogin = async () => {
    window.open(`${API_URL}/auth/github`, '_self');
  };

  return (
    <div className="login-wrapper">
      <div className="login-options-wrapper">
        <div className="login-options" onClick={handleGoogleLogin}>
          Google+
        </div>
        <div className="login-options" onClick={handleFacebookLogin}>
          Facebook
        </div>
        <div className="login-options" onClick={handleGithubLogin}>
          Github
        </div>
      </div>
    </div>
  );
};

export default Login;
