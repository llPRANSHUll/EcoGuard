// src/pages/Alerts.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress } from '@mui/material';

function Alerts() {
  const [alertData, setAlertData] = useState([]); // State to store alert data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors

  // Fetch alerts from the API
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/alerts/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAlertData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading once the API call is complete
      }
    };

    fetchAlerts();
  }, []);

  // Handle error state
  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #4E342E, #2E7D32)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFD700',
        }}
      >
        <Typography variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4E342E, #2E7D32)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          width: '100%',
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            fontFamily: '"Roboto", sans-serif',
            mb: 4,
          }}
        >
          Active Wildlife Alerts
        </Typography>
      </Box>

      {/* Show Loading Indicator */}
      {loading ? (
        <CircularProgress sx={{ color: '#FFD700' }} />
      ) : (
        <Grid container spacing={4} sx={{ maxWidth: 1200, width: '100%' }}>
          {alertData.map((alert) => (
            <Grid item xs={12} sm={6} md={4} key={alert.id}>
              <Card
                sx={{
                  position: 'relative',
                  background: `linear-gradient(145deg, #FF8C00, #FFD700)`,
                  color: '#fff',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transform: 'scale(1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.6)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 70%)',
                    opacity: 0.1,
                  }}
                />
                <CardContent
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '2rem',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
                      fontSize: '1.2rem',
                    }}
                  >
                    {alert.title}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 2,
                      fontSize: '1rem',
                      fontWeight: '500',
                      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    Location: {alert.location}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    Date: {alert.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Alerts;
