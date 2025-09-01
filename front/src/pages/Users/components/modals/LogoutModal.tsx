import { useAuth } from "../../../../Contexts/AuthContext/AuthContext";

interface LogoutModalProps{
  cancelLogout: () => void;
}

export function LogoutModal({cancelLogout} : LogoutModalProps) {
    const {logout} = useAuth()
    return (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions">
              <button
                type="button"
                onClick={cancelLogout}
                className="button-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={logout}
                className="logout-button"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
    )
}