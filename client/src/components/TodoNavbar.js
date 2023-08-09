import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/style.css";

const drawerWidth = 240;

function TodoNavbar(props) {
  const username = localStorage.getItem("username");

  const toastOptions = {
    position: "bottom-left",
    autoClose: 1000,
    pauseOnHover: false,
    closeOnClick: false,
    draggable: false,
    theme: "dark",
  };

  const logoutFunction = () => {
    toast.warning("Odhlasujem Vás...", toastOptions);
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "http://localhost:3000/";
    }, 2000);
  };

  const redirectToLoginForm = () => {
    window.location.href = "http://localhost:3000/prihlasenie";
  };

  const redirectToRegisterForm = () => {
    window.location.href = "http://localhost:3000/registracia";
  };

  const { windows } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {username}
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={logoutFunction}
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              color: "rgb(27, 118, 255)",
            }}
          >
            Logout
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={redirectToLoginForm}
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              color: "rgb(27, 118, 255)",
            }}
          >
            Login
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={redirectToRegisterForm}
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              color: "rgb(27, 118, 255)",
            }}
          >
            Register
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    windows !== undefined ? () => windows().document.body : undefined;

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                className="logout-btn"
                onClick={logoutFunction}
                sx={{ color: "#fff" }}
              >
                Logout
              </Button>
              <Button
                className="login-btn"
                onClick={redirectToLoginForm}
                sx={{ color: "#fff" }}
              >
                Login
              </Button>
              <Button
                className="register-btn"
                onClick={redirectToRegisterForm}
                sx={{ color: "#fff" }}
              >
                Register
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default TodoNavbar;