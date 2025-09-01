import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext/AuthContext';
import { UsersProvider } from './Contexts/UsersContext/UsersContext';
import { Router } from './Router';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { CssBaseline } from '@mui/material';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <UsersProvider>
            <Router/>
          </UsersProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
