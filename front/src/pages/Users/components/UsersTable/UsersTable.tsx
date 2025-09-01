import { useAuth } from "../../../../Contexts/AuthContext/AuthContext";
import { useUsers } from "../../../../Contexts/UsersContext/UsersContext";
import { ConfirmDeleteModal } from "../modals/DeleteUserModal";
export function UsersTable() {
    const {user: currentUser} = useAuth()
    const {users, setUserToDelete, userToDelete} = useUsers()

    return (
        <>
        <table className="users-table">
        <thead>
            <tr>
            <th>UUID</th>
            <th>Username</th>
            <th>Role</th>
            <th className="actions-column">Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
            <tr key={user.uuid}>
                <td>{user.uuid}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td className="actions-column">
                <button
                    disabled={currentUser?.uuid === user.uuid}
                    onClick={() => {
                        setUserToDelete(user)
                    }} className="delete-button"
                >
                    Delete
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        {userToDelete && <ConfirmDeleteModal/>}
        </>
    );
}