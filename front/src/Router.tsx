import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContext/AuthContext';
import { LoginPage } from './pages/Login/Login';
import { ProtectedComponent } from './components/ProtectedComponent/ProtectedComponent';
import { UsersPage } from './pages/Users/Users';
import { Layout } from './pages/Layout/Layout';
import { MyAccount } from './pages/MyAccount/MyAccount';

export function Router() {
    const {token} = useAuth()
    return (
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route
            element={
              token ? (
                <Layout/>
              ) 
              :
              (<Navigate to="/login"/>)
            }
          >
            <Route
              path="/users"
              element={<ProtectedComponent role='admin'><UsersPage/></ProtectedComponent>}
            />
            <Route
              path="/myUser"
              element={<MyAccount/>}
            />
          </Route>
          {/* Default route redirects based on auth status */}
          <Route path="*" element={<Navigate to={token ? "/users" : "/login"} />} />
        </Routes>
    )
}