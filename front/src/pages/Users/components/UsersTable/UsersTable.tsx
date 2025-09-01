import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { RoundedPaper } from "../../../../components/RoundedPaper/RoundedPaper";
import { useAuth } from "../../../../Contexts/AuthContext/AuthContext";
import { useUsers } from "../../../../Contexts/UsersContext/UsersContext";
import { ConfirmDeleteModal } from "../modals/DeleteUserModal";
import { UserRow } from "./components/UserRow";
export function UsersTable() {
    const {user: currentUser} = useAuth()
    const {users, setUserToDelete, userToDelete} = useUsers()

    return (
        <>
            <TableContainer component={RoundedPaper}>
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
                        <UserRow
                            key={user.uuid}
                            user={user}
                            currentUserUuid={currentUser?.uuid}
                            onDelete={setUserToDelete}
                        />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {userToDelete && <ConfirmDeleteModal/>}
        </>
    );
}