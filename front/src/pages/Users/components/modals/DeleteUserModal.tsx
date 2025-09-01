import { useUsers } from "../../../../Contexts/UsersContext/UsersContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export function ConfirmDeleteModal() {
  const {userToDelete, setUserToDelete, deleteUser} = useUsers()
  return (
    <Dialog
      open={!!userToDelete}
      onClose={() => setUserToDelete(null)}
      aria-labelledby="delete-user-dialog-title"
      aria-describedby="delete-user-dialog-description"
    >
      <DialogTitle id="delete-user-dialog-title">Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-user-dialog-description">
          Are you sure you want to delete the user{" "}
          <strong>{userToDelete?.username}</strong>? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setUserToDelete(null)} variant="secondary" size="small">
          Cancel
        </Button>
        <Button
          onClick={deleteUser}
          variant="delete"
          size="small"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}