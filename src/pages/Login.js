// src/pages/Login.js
import React from 'react';
import { TextField, Button, Typography, Card } from '@mui/material';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="p-8 rounded-lg shadow-lg w-full max-w-sm">
        <Typography variant="h5" className="font-bold text-gray-800 text-center mb-6">
          Login to EcoGuard
        </Typography>
        <form className="space-y-6">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
