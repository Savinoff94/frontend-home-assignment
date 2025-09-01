import { useState } from "react";
import { LogoutModal } from "../../pages/Users/components/modals/LogoutModal";

export function Header() {
    const [confirmLogout, setConfirmLogout] = useState(false);
    return (
        <>
            <header className="users-page-header">
                <h1>User Management</h1>
                <button onClick={() => setConfirmLogout(true)} className="logout-button">
                    Logout
                </button>
            </header>
            {confirmLogout && (
                <LogoutModal
                    cancelLogout={() => setConfirmLogout(false)}
                />
            )}
        </>
    )
}