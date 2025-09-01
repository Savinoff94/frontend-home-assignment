import { useState } from "react";
import { CreateUserModal } from "../modals/CreateUserModal";
import { AppBar, Toolbar as MuiToolbar, Typography, Button } from "@mui/material";

export function Toolbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <MuiToolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Users
          </Typography>
          <Button
            variant="primary" // uses your blue gradient from theme
            size="small"
            onClick={() => setIsModalOpen(true)}
          >
            Create New User
          </Button>
        </MuiToolbar>
      </AppBar>
      {isModalOpen && (
        <CreateUserModal
          onClose={() => setIsModalOpen(false)}
          onUserCreated={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
    
  );
}