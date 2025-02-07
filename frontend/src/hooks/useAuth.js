<<<<<<< HEAD
import { useState } from 'react';
=======
import { useState } from "react";
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

<<<<<<< HEAD
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
=======
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
    } else {
<<<<<<< HEAD
      localStorage.setItem('token', data.token);
=======
      // Store user data (including JWT) in localStorage
      localStorage.setItem("user", JSON.stringify(data));
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f
      setIsLoading(false);
    }
  };

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

<<<<<<< HEAD
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
=======
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setIsLoading(false);
    } else {
<<<<<<< HEAD
      localStorage.setItem('token', data.token);
=======
      // Store user data (including JWT) in localStorage
      localStorage.setItem("user", JSON.stringify(data));
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f
      setIsLoading(false);
    }
  };

  return { login, signup, isLoading, error };
};
