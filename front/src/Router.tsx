import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContext/AuthContext';
import { LoginPage } from './pages/Login/Login';
import { ProtectedComponent } from './components/ProtectedComponent/ProtectedComponent';
import { UsersPage } from './pages/Users/Users';

export function Router() {
    const {token} = useAuth()
    return (
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route
            path="/users"
            element={<ProtectedComponent role='admin'><UsersPage/></ProtectedComponent>}
          />
          {/* Default route redirects based on auth status */}
          <Route path="*" element={<Navigate to={token ? "/users" : "/login"} />} />
        </Routes>
    )
}