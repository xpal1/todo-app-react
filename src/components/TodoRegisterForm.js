import React from "react";
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
import TodoNavbar from "./TodoNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

class TodoRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    const { navigate } = this.props;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      username: data.get("username"),
    });

    // resetovanie formulara
    this.setState({ email: "", password: "", username: "" });

    try {
      const res = await axios.post("http://localhost:5000/register", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
      });

      if (res.data === "exist") {
        alert("Taký užívateľ už existuje!");
      } else if (res.data === "notexist") {
        alert("Úspešne ste sa zaregistrovali!");
        navigate("/todos");
      }
    } catch (error) {
      alert("Zadal si nesprávne údaje!");
      console.log(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { username, email, password } = this.state;

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
              Registrácia
            </Typography>
            <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
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
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
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
                  Už máš účet? Prihlás sa
                </Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default function TodoRegisterFormWrapper(props) {
  const navigate = useNavigate();

  return <TodoRegisterForm {...props} navigate={navigate} />;
}
