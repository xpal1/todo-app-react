import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import TodoNavbar from "../components/TodoNavbar";
import TodoRegisterForm from "./TodoRegisterForm";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function TodoLoginForm(props) {

  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleStayLoggedInChange = (event) => {
    setStayLoggedIn(event.target.checked);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    const { navigate } = props;
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get("password"),
      username: data.get("username"),
    });

    // resetovanie formulara
    setUsername("");
    setPassword("");

    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        username: data.get("username"),
        password: data.get("password"),
      });
  
      if (res.data.userId) {
        alert("Úspešne si sa prihlásil!");
        navigate("/todos");
        props.onLogin(res.data.token);
        // ulozenie udajov do localStorage
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("username", data.get("username"));
        localStorage.setItem("password", data.get("password"));
      } else {
        alert("Nie si zaregistrovaný!");
        navigate("/registracia");
        setError(true);
      }
    } catch (e) {
      alert("Zadal si nesprávne údaje!");
      console.log(e);
    }
  };

    if (error) {
      return <TodoRegisterForm />;
    }

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
            <Typography component="h1" variant="h5">
              Prihlásenie
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stayLoggedIn}
                    onChange={handleStayLoggedInChange}
                    color="primary"
                  />
                }
                label="Ostať prihlásený"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Prihlásiť sa
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="http://localhost:3000/registracia"
                    variant="body2"
                  >
                    {"Ešte nemáš účet? Zaregistruj sa"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

export default function TodoLoginFormWrapper(props) {
  const navigate = useNavigate();

  return <TodoLoginForm {...props} navigate={navigate} />;
}
