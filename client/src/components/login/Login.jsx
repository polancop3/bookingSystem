import React, { useState } from 'react';
import { useAuth } from '../../context/auth-context'

export default function Login() {
  const { login } = useAuth();
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    login(email, password)
    .catch((error) => alert("Unable to log you in! possible issues: Wrong Password or email"));
  }

  return (
      <form onSubmit={ handleLogin }>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label name="email">Email</label>
          <input value={email} type="email" className="form-control" placeholder="Enter email" onChange={ handleEmailChange }
          />
        </div>
        <div className="mb-3">
          <label name="password">Password</label>
          <input value={password} type="password" className="form-control" placeholder="Enter password"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" >
            Submit
          </button>
        </div>
        {/* <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p> */}
      </form>
    )
}