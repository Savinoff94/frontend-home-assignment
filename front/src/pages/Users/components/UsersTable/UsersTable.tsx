import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { useAuth } from "../../../../Contexts/AuthContext/AuthContext";
import { useUsers } from "../../../../Contexts/UsersContext/UsersContext";
import { ConfirmDeleteModal } from "../modals/DeleteUserModal";
export function UsersTable() {
    const {user: currentUser} = useAuth()
    const {users, setUserToDelete, userToDelete} = useUsers()

    return (
        <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>UUID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user) => (
                    <TableRow key={user.uuid}>
                    <TableCell>{user.uuid}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                        <Button
                        variant="delete"
                        size="small"
                        disabled={currentUser?.uuid === user.uuid}
                        onClick={() => setUserToDelete(user)}
                        >
                        Delete
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        {userToDelete && <ConfirmDeleteModal/>}
        </>
    );
}