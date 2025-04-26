import React, { useState, PropsWithChildren } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGetIdentity, useResource } from "@refinedev/core";
import { useNavigate, Link } from "react-router";
import Cookie from "js-cookie";
import { TOKEN_KEY } from "../../config/constants";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: user } = useGetIdentity<any>();
  const { resources } = useResource();
  const navigate = useNavigate();

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const handleLogout = () => {
    Cookie.remove(TOKEN_KEY);
    navigate(0);
  };

  const listableResources = resources.filter((resource) => resource.list);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>

          <Box display="flex" sx={{ alignItems: "center", gap: 1 }}>
            <Typography>{user?.name}</Typography>
            <Avatar src={user?.avatar} alt={user?.name} />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <Toolbar />
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 1 }} />

            {listableResources.map((resource) => (
              <ListItem key={resource.name} disablePadding>
                <ListItemButton component={Link} to={resource.name}>
                  <ListItemText primary={resource.name.charAt(0).toUpperCase() + resource.name.slice(1)} />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ my: 1 }} />

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Box
          sx={{
            p: 3,
            m: "auto",
            width: "80rm",
            height: "90vh",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};
