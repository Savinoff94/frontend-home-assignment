import { useState } from "react";
import { LogoutModal } from "../../pages/Users/components/modals/LogoutModal";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export function Header() {
    const [confirmLogout, setConfirmLogout] = useState(false);
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>User Management</Typography>
                    <Button
                        variant="secondary"
                        onClick={() => setConfirmLogout(true)}
                    >
                        Logout
                    </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            {confirmLogout && (
                <LogoutModal
                    cancelLogout={() => setConfirmLogout(false)}
                />
            )}
        </>
    )
}