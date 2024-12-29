import './Signup.css';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useRegisterMutation } from '../../hooks/useAuth';

export const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: signup } =  useRegisterMutation(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signup({ username, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Signup</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Signup
          </button>
        </form>
        <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};
