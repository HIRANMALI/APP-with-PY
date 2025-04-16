"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import "../../styles/Login.scss";

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    identifier: "", // Email only
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // only needed if server still sets cookies
        body: JSON.stringify({
          identifier: credentials.identifier,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      // Save user in sessionStorage (adjusted)
      sessionStorage.setItem("user", JSON.stringify({ name: data.username, role: data.role }));

      // Redirect based on role
      router.push(data.role === "guide" ? "/guide" : "/");
    } catch (error) {
      alert(error.message);
    }
  };

  // Trigger login on Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    // Clear the sessionStorage on every login page reload to prevent old data showing
    sessionStorage.removeItem("user");
  }, []);

  return (
    <Container maxWidth="xs" className="login-container">
      <Typography variant="h4" align="center" className="login-title">
        Login
      </Typography>
      <Box
        component="form"
        className="login-form"
        onKeyPress={handleKeyPress} // Added key press listener for Enter
      >
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          className="login-input"
          value={credentials.identifier}
          onChange={(e) =>
            setCredentials({ ...credentials, identifier: e.target.value })
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
