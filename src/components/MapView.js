// src/components/MapView.js
import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Box, Typography } from '@mui/material';
import { FaTree, FaFire, FaPaw } from 'react-icons/fa';
import axios from 'axios';

function MapView() {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 3,
    width: "100%",
    height: "500px",
  });

  const [stations, setStations] = useState([]); // State to store API data
  const [selectedStation, setSelectedStation] = useState(null);

  // Icon mapping for station types
  const stationIcons = {
    fire: <FaFire size={20} color="#FF6347" />,
    wildlife: <FaPaw size={20} color="#32CD32" />,
    default: <FaTree size={20} color="#FFD700" />,
  };

  // Fetch monitoring stations from the API
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/monitoring-stations/');
        setStations(response.data); // Store API data in state
      } catch (error) {
        console.error("Error fetching monitoring stations:", error);
      }
    };
    fetchStations();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1200,
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#2E4057',
        margin: '0 auto',
      }}
    >
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoicHJhbnNodTE0OSIsImEiOiJjbTNqZjZjZ3kwMnduMnZwcnplbzJzZ202In0.X4hL2eJ-YkloHintQDa6WA"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
      >
        {stations.map((station) => (
          <Marker
            key={station.id}
            latitude={station.location.coordinates[1]} // Latitude from API
            longitude={station.location.coordinates[0]} // Longitude from API
          >
            <Box
              sx={{
                cursor: 'pointer',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                padding: '10px',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
                animation: 'pulse 1.5s infinite',
              }}
              onClick={() => setSelectedStation(station)}
            >
              {stationIcons[station.type] || stationIcons.default}
            </Box>
          </Marker>
        ))}

        {selectedStation && (
          <Popup
            latitude={selectedStation.location.coordinates[1]}
            longitude={selectedStation.location.coordinates[0]}
            onClose={() => setSelectedStation(null)}
            closeOnClick={false}
            offsetTop={-10}
          >
            <Box
              sx={{
                padding: '10px',
                backgroundColor: '#FFD700',
                borderRadius: '10px',
                color: '#000',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              <Typography variant="subtitle2">{selectedStation.name}</Typography>
              <Typography variant="caption">
                Type: {selectedStation.type}
              </Typography>
            </Box>
          </Popup>
        )}
      </ReactMapGL>

      {/* Marker Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255, 99, 71, 0.4);
            }
            70% {
              transform: scale(1.1);
              box-shadow: 0 0 20px 20px rgba(255, 99, 71, 0);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255, 99, 71, 0);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default MapView;
