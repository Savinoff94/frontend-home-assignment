import { useState } from "react";
import { LogoutModal } from "../../pages/Users/components/modals/LogoutModal";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import CompanyIcon from "../Icons/Icons";

export function Header() {
    const [confirmLogout, setConfirmLogout] = useState(false);
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1, // keep above Drawer
                }}
            >
                <Toolbar>
                <Typography variant="h6" sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                }}>
                    <CompanyIcon/>
                    Meshulash
                </Typography>
                <Button
                    color="inherit"
                    onClick={() => setConfirmLogout(true)}
                >
                    Logout
                </Button>
                </Toolbar>
            </AppBar>
            {confirmLogout && (
                <LogoutModal
                    cancelLogout={() => setConfirmLogout(false)}
                />
            )}
        </>
    )
}