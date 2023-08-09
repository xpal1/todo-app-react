import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoNavbar from "../components/TodoNavbar";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/css/style.css";

const defaultTheme = createTheme();

function TodoLoginForm() {
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1400,
    pauseOnHover: false,
    closeOnClick: false,
    draggable: false,
    theme: "dark",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // resetovanie formulara
    setUsername("");
    setPassword("");

    const successCallback = () => {
      toast.success("Úspešne ste sa prihlásili!", toastOptions);
    };
  
    const errorCallback = () => {
      toast.error("Zadali ste nesprávne údaje!", toastOptions);
    };

    dispatch(loginUser(username, password, successCallback, errorCallback));
  };

    return (
      <ThemeProvider theme={defaultTheme}>
        <TodoNavbar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography sx={{ textAlign: "center" }} component="h1" variant="h6">
              Prihláste sa, ak chcete pokračovať...
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                type="text"
                label="Užívateľské meno"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={handlePasswordChange}
                label="Heslo"
                value={password}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Prihlásiť sa
              </Button>
            </Box>
          </Box>
          <ToastContainer />
        </Container>
      </ThemeProvider>
    );
  }

export default TodoLoginForm;