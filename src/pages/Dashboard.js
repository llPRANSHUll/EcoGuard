import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import MapView from '../components/MapView';

function Dashboard() {
  const [summaryData, setSummaryData] = useState([
    { title: "Deforestation Hotspots", value: 0, color: "#A0522D", icon: "🔥" },
    { title: "Wildlife Alerts", value: 0, color: "#FF8C00", icon: "🐾" },
    { title: "Area Monitored (sq. km)", value: 0, color: "#228B22", icon: "🌳" },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/alerts/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Calculate dynamic values
        const deforestationCount = data.filter(
          (alert) => alert.alert_type === 'illegal_logging'
        ).length;

        const wildlifeCount = data.filter(
          (alert) => alert.alert_type === 'wildlife_trafficking'
        ).length;

        const areaMonitored = 4523; // Replace this with logic if available from API

        // Update summaryData dynamically
        setSummaryData([
          { title: "Deforestation Hotspots", value: deforestationCount, color: "#A0522D", icon: "🔥" },
          { title: "Wildlife Alerts", value: wildlifeCount, color: "#FF8C00", icon: "🐾" },
          { title: "Area Monitored (sq. km)", value: areaMonitored, color: "#228B22", icon: "🌳" },
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #4E342E, #2E7D32)',
        }}
      >
        <Typography sx={{ color: '#FFD700' }}>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #4E342E, #2E7D32)',
        }}
      >
        <Typography sx={{ color: '#FFD700' }}>Error: {error}</Typography>
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
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#FFD700',
          textAlign: 'center',
          mb: 4,
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
          fontFamily: '"Roboto", sans-serif',
        }}
      >
        EcoGuard: Wildlife Conservation Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={4} sx={{ maxWidth: 1200 }}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                position: 'relative',
                background: `linear-gradient(145deg, ${item.color}, ${item.color}cc)`,
                color: '#fff',
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
                borderRadius: '20px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.4)',
                },
                overflow: 'hidden',
              }}
            >
              <CardContent
                sx={{
                  textAlign: 'center',
                  padding: '2rem',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Map Section */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
          mt: 6,
        }}
      >
        <MapView />
      </Box>
    </Box>
  );
}

export default Dashboard;
