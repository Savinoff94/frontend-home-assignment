import { useAuth } from "../../../../Contexts/AuthContext/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
interface LogoutModalProps{
  cancelLogout: () => void;
}

export function LogoutModal({cancelLogout} : LogoutModalProps) {
    const {logout} = useAuth()
    return (
      <Dialog
      open
      onClose={cancelLogout}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout} variant="secondary" size="small">
            Cancel
          </Button>
          <Button
            onClick={logout}
            variant="delete"
            size="small"
            autoFocus
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    )
}