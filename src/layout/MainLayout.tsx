import { type ReactNode, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import SensorsIcon from '@mui/icons-material/Sensors';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const drawerWidth = 220;

export default function MainLayout({ children }: { children: ReactNode }) {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  //const isMobile = true;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    handleMenuClose();
    navigate("/login");
  };

  const drawer = (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List>
        <ListItem
          component={Link}
          to="/dashboard"
          onClick={() => setMobileOpen(false)}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          component={Link}
          to="/devices"
          onClick={() => setMobileOpen(false)}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <SensorsIcon />
            </ListItemIcon>
            <ListItemText primary="Devices" />
          </ListItemButton>
        </ListItem>
        {user?.role === "admin" && (
          <ListItem
            component={Link}
            to="/admin"
            onClick={() => setMobileOpen(false)}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItemButton>
          </ListItem>
        )}
        {user?.role === "admin" && (
          <ListItem
            component={Link}
            to="/users"
            onClick={() => setMobileOpen(false)}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Agrosync webapp
          </Typography>
          {user && (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>{user.email}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          pb: 8,
        }}
      >
        <Toolbar />
        {children}
        <Box
          component="footer"
          sx={{
            position: "fixed",
            bottom: 0,
            left: { xs: 0, md: drawerWidth },
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
            py: 1.5,
            textAlign: "center",
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            zIndex: theme.zIndex.drawer - 1,
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Agrosync webapp. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
