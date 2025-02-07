<<<<<<< HEAD
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

=======
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user exists, render the protected component
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f
  return children;
};

export default RequireAuth;
