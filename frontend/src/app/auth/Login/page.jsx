"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import "../../styles/Login.scss"; // Importing SCSS file

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    const userData = { username: credentials.username, role: "tourist" };
    localStorage.setItem("user", JSON.stringify(userData));
    router.push(userData.role === "guide" ? "/guide" : "/home");
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Typography variant="h4" align="center" className="login-title">
        Login
      </Typography>
      <Box component="form" className="login-form">
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          className="login-input"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          className="login-input"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button
          variant="contained"
          fullWidth
          className="login-button"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
      <Typography variant="body2" align="center" className="signup-text">
        Don't have an account?{" "}
        <button
          className="signup-text"
          onClick={() => router.push("/auth/SignUp")}
        >
          Sign Up
        </button>
      </Typography>
    </Container>
  );
}
