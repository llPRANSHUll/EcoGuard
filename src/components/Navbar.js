// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #4E342E, #2E7D32)', // Make the navbar transparent
        opacity : '90%',
        boxShadow: '10', // Remove shadows
        padding: 0,
        zIndex: 10, // Ensure navbar stays on top of content
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#FFD700', // Use golden yellow for logo
            fontFamily: '"Roboto", sans-serif',
            letterSpacing: '1px',
            cursor: 'pointer',
          }}
          component={Link}
          to="/"
        >
          EcoGuard
        </Typography>

        {/* Navigation Links */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
          }}
        >
          {['Alerts', 'Login'].map((text, index) => (
            <Button
              key={index}
              component={Link}
              to={`/${text.toLowerCase()}`}
              sx={{
                color: '#FFFFFF', // White text for links
                fontWeight: 'bold',
                fontSize: '1rem',
                padding: '0.5rem 1rem',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#FFD700', // Golden color on hover
                },
              }}
            >
              {text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
