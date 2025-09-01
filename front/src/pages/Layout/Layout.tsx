import { Outlet, NavLink } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Button,
  Divider,
  ListItemButton,
} from "@mui/material";

const drawerWidth = 240;

export function Layout() {
  const { user } = useAuth();

  return (
    <Box>
        <Header/>
        <Drawer
            variant="permanent"
            sx={{
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  top: (t) => t.mixins.toolbar.minHeight,
                  height: (t) => `calc(100% - ${t.mixins.toolbar.minHeight}px)`,
                },
            }}
        >

            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/myUser"
                        sx={{
                        "&.active": {
                            bgcolor: "action.selected",
                        },
                        }}
                    >
                        <ListItemText primary="My account" />
                    </ListItemButton>
                </ListItem>

                {user?.role === 'admin' && <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/users"
                        sx={{ "&.active": { bgcolor: "action.selected" } }}
                    >
                        <ListItemText primary="Users" />
                    </ListItemButton>
                </ListItem>}
            </List>
        </Drawer>
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            ml: `${drawerWidth}px`,
            position: "relative",
            top: (t) => t.mixins.toolbar.minHeight,
            }}
        >
            <Outlet />
        </Box>
    </Box>
    
  );
}