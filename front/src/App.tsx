import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { UsersPage } from './pages/Users';
import { type User } from './types';

/**
 * A wrapper component to manage routing logic.
 * We need this because the useNavigate hook can only be used inside a Router component.
 */
function AppRoutes() {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const navigate = useNavigate();

  const handleLoginSuccess = (token: string, user: User) => {
    if (user.role !== 'admin') {
      alert('Login failed: Only admin users are allowed.');
      return;
    }
    setAuthToken(token);
    setCurrentUser(user)
    localStorage.setItem('authToken', token);
    navigate('/users'); // Redirect to users page on successful login
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page on logout
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
      <Route
        path="/users"
        element={
          authToken && currentUser ? (
            <UsersPage currentUser={currentUser} authToken={authToken} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" /> // Protect this route
          )
        }
      />
      {/* Default route redirects based on auth status */}
      <Route path="*" element={<Navigate to={authToken ? "/users" : "/login"} />} />
    </Routes>
  );
}

// The main App component now just sets up the Router
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
