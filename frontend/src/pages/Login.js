<<<<<<< HEAD
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login, error, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={isLoading}>Login</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
=======
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Login logic here...
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>

      {/* Add Sign-Up button */}
      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </p>
    </div>
  );
};

export default Login;
>>>>>>> ab6898f05c23b8b87630bac4c366c0477efbad0f
