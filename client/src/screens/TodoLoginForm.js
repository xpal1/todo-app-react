import React from "react";
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

class TodoLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stayLoggedIn: false,
      username: "",
      password: "",
    };
  }

  handleStayLoggedInChange = (event) => {
    this.setState({ stayLoggedIn: event.target.checked });
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async (event) => {
    const { navigate } = this.props;
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get("password"),
      username: data.get("username"),
    });

    // resetovanie formulara
    this.setState({ username: "", password: "" });

    try {
      const res = await axios.post("http://localhost:5000/login", {
        username: data.get("username"),
        password: data.get("password"),
      });

      if (res.data === "exist") {
        alert("Úspešne si sa prihlásil!");
        navigate("/todos");

        this.props.onLogin();

        // ulozenie udajov do localStorage
        localStorage.setItem("username", data.get("username"));
        localStorage.setItem("password", data.get("password"));
      } else if (res.data === "notexist") {
        alert("Nie si zaregistrovaný!");
        navigate("/registracia");
        this.setState({ error: true });
      }
    } catch (e) {
      alert("Zadal si nesprávne údaje!");
      console.log(e);
    }
  };

  render() {
    const { stayLoggedIn, username, password } = this.state;

    if (this.state.error) {
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
            <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                type="text"
                label="Užívateľské meno"
                name="username"
                value={username}
                onChange={this.handleUsernameChange}
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={this.handlePasswordChange}
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
                    onChange={this.handleStayLoggedInChange}
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
}

export default function TodoLoginFormWrapper(props) {
  const navigate = useNavigate();

  return <TodoLoginForm {...props} navigate={navigate} />;
}
