import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './context/auth-context'
import { AuthenticatedRoutes, UnauthenticatedRoutes } from './routes'

function App() {
  const { loggedIn } = useAuth();
  

  return loggedIn? <AuthenticatedRoutes/> : <UnauthenticatedRoutes/>
}

export default App;
