import { useState, type FormEvent } from "react";
import { useUsers } from "../../../../Contexts/UsersContext/UsersContext";
import type { UserRole } from "../../../../types";

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
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New User</h2>
                <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="new-username">Username</label>
                    <input id="new-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="new-password">Password</label>
                    <input id="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="new-role">Role</label>
                    <select id="new-role" value={role} onChange={(e) => setRole(e.target.value as 'user' | 'admin')}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    </select>
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="modal-actions">
                    <button type="button" onClick={onClose} className="button-secondary">Cancel</button>
                    <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create User'}
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
}