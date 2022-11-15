import React, { createContext } from "react";
import useStorage from "../hooks/useStorage";
import axios from "axios";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [idToken, setIdToken] = useStorage("idToken", "")

  const login = (email, password) => {
    const url = "http://localhost:8080/auth/sign-in"

    return axios
     .post(url, { email, password })
     .then((response) => setIdToken(response.data.idToken))
  };

  const logout = () => {
    setIdToken("");
  };

  const authContextValue = {
    login,
    logout,
    idToken,
    loggedIn: !!idToken 
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };