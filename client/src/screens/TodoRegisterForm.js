import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoNavbar from "../components/TodoNavbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/userSlice.js";
// import { useToasts } from "react-toast-notifications";
import "../components/css/style.css";

const defaultTheme = createTheme();

function TodoRegisterForm() {
  // const { addToast } = useToasts();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // resetovanie formulara
    setEmail("");
    setPassword("");
    setUsername("");

    const successCallback = () => {
      // addToast("Úspešne ste sa zaregistrovali, choďte sa prihlásiť!", {
      //   appearance: "success",
      //   autoDismiss: true,
      //   autoDismissTimeout: 2500,
      //   placement: "top-right",
      //   className: "todo-toast"
      // });
    };
  
    const errorCallback = () => {
      // addToast("Už ste zaregistrovaní, prihláste sa!", {
      //   appearance: "error",
      //   autoDismiss: true,
      //   autoDismissTimeout: 2500,
      //   placement: "top-right",
      //   className: "todo-toast"
      // });
    };

    dispatch(registerUser(username, email, password, successCallback, errorCallback));
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
            Zaregistrujte sa, ak chcete pokračovať
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  type="text"
                  fullWidth
                  id="username"
                  label="Meno a priezvisko"
                  autoFocus
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Emailová adresa"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Heslo"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrovať sa
            </Button>
            <Grid item>
              <Link href="http://localhost:3000/prihlasenie" variant="body2">
                Už máte účet? Prihláste sa
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default function TodoRegisterFormWrapper(props) {
  const navigate = useNavigate();

  return <TodoRegisterForm {...props} navigate={navigate} />;
}
