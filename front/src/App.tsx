import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext/AuthContext';
import { UsersProvider } from './Contexts/UsersContext/UsersContext';
import { Router } from './Router';


// The main App component now just sets up the Router
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <Router/>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
