import React, { useState } from 'react'
import axios from 'axios'

export default function SignUp() {
  const[firstName, setFirstname] = useState("")
  const[lastName, setLastName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const url ="http://localhost:8080/auth/create-user"
  
  function handlefirstNameChange(e) {
    setFirstname(e.target.value)
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSignup(e) {
    e.preventDefault();
 
     axios.post(url, {
       "email": email,
       "password": password
     })
     .then((response) => {
       console.log(response);
       alert("Registration complete! please sign in.")
     }, (error) => {
       console.log(error);
     });
    }

    return (
      <form>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input type="text" className="form-control" placeholder="First name" value={firstName} 
           onChange={handlefirstNameChange}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="text" className="form-control" placeholder="Enter Email" value={email} onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" value={password}
          onChange={handlePasswordChange}
          />
        </div>
        <div className="d-grid">
          <button onClick={handleSignup} type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    )
} 