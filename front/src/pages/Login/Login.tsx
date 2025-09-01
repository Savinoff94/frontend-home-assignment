import { useState, type FormEvent } from 'react';
import './Login.css';
import '../Users/Users.css';
import { useAuth } from '../../Contexts/AuthContext/AuthContext';



export function LoginPage() {
  // State for form inputs, loading status, and error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useAuth()

  // Handles the form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(username, password)
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
