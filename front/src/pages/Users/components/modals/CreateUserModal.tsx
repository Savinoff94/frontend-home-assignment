import { useState, type FormEvent } from "react";
import { useUsers } from "../../../../Contexts/UsersContext/UsersContext";
import type { UserRole } from "../../../../types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Stack,
    Button,
  } from "@mui/material";

interface CreateUserModalProps {
    onClose: () => void;
    onUserCreated: () => void;
}
  
export function CreateUserModal({ onClose, onUserCreated }: CreateUserModalProps) {
    const {error, isLoading, createUser} = useUsers()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('user');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        createUser(username, password, role, onUserCreated)
    };

    return (
        <Dialog
      open
      onClose={onClose}
      aria-labelledby="create-user-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="create-user-dialog-title">Create New User</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              id="new-username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              autoFocus
            />

            <TextField
              id="new-password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="new-role-label">Role</InputLabel>
              <Select<UserRole>
                labelId="new-role-label"
                id="new-role"
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            {error && <FormHelperText error>{error}</FormHelperText>}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="secondary" onClick={onClose} size="small">
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            size="small"
          >
            {isLoading ? "Creating..." : "Create User"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
    );
}