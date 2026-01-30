import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const res = await loginRequest(email, password);
      login(res.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default"
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Sign In
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" mt={2}>
          Don’t have an account? <Link to="/register">Register</Link>
        </Typography>
      </Paper>
    </Box>
  );
}