import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
  const { signup, error, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Signup;
