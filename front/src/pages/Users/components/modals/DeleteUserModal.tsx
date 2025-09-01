import { useUsers } from "../../../../Contexts/UsersContext/UsersContext";

export function ConfirmDeleteModal() {
  const {userToDelete, setUserToDelete, deleteUser} = useUsers()
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the user "<strong>{userToDelete?.username}</strong>"?
          This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button
            type="button"
            onClick={() => {
              close()
              setUserToDelete(null)
            }}
            className="button-secondary">
            Cancel
          </button>
          <button
            type="button"
            onClick={async() => {
              await deleteUser()
            }}
            className="delete-button">
              Delete
            </button>
        </div>
      </div>
    </div>
  );
}