<<<<<<< HEAD
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
  const { signup, error, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
=======
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const { signup, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
<<<<<<< HEAD
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div>{error}</div>}
=======

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f
    </form>
  );
};

export default Signup;
