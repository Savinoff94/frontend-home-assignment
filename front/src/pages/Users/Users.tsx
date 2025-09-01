import { Notification } from '../../components/Notification/Notification';
import './Users.css';
import { UsersTable } from './components/UsersTable/UsersTable';
import { Toolbar } from './components/Toolbar/Tooldbar';
import { Header } from '../../components/Header/Header';
import { useUsers } from '../../Contexts/UsersContext/UsersContext';

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

      <Header/>

      <Toolbar/>

      {isLoading && <p>Loading users...</p>}
      {/* The main error message is only for critical load failures */}
      {error && <p className="error-message">{error}</p>}

      {!isLoading && !error && (
        <UsersTable/>
      )}
    </div>
  );
}
