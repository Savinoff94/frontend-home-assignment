import { Notification } from '../../components/Notification/Notification';
import { UsersTable } from './components/UsersTable/UsersTable';
import { Toolbar } from './components/Toolbar/Tooldbar';
import { LoadingSpinner } from '../../components/Spinner/Spinner';
import { useUsers } from '../../Contexts/UsersContext/UsersContext';
import { Alert } from '@mui/material';

export function UsersPage() {
  const {
    isLoading,
    error,
    notification,
    setNotification,
  } = useUsers();

  return (
    <div className="users-page-container">
      
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}

      <Toolbar/>

      {isLoading && <LoadingSpinner/>}
      {error && <Alert severity="error">{error}</Alert>}
      {!isLoading && !error && (
        <UsersTable/>
      )}
    </div>
  );
}
