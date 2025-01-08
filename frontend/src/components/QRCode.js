import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

const URL = process.env.REACT_APP_API_URL; // Access environment variable

const QRCode = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

const baseUrl = `${URL}/show-restaurant/`;

  useEffect(() => {
    axios
      .get(`${URL}/api/restaurant`) // Update with your API endpoint
      .then((res) => {
        console.log('API response:', res.data);
        if (Array.isArray(res.data)) {
          setRestaurants(res.data);
        } else {
          console.error('Unexpected data format:', res.data);
          setRestaurants([]); // Avoid crashing
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching restaurants:', err);
        setLoading(false);
      });
  }, []);
  

  const downloadQR = (restaurantId, restaurantName) => {
    const canvas = document.createElement('canvas');
    const svg = document.getElementById(`qr-${restaurantId}`);
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const a = document.createElement('a');
      a.download = `QR-${restaurantName.replace(/\s+/g, '-')}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
        Restaurant QR Codes
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
        Click on a QR code to download it or use the "Download QR" button.
      </Typography>

      <Grid container spacing={3}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <QRCodeSVG
                  id={`qr-${restaurant._id}`}
                  value={`${baseUrl}${restaurant._id}`}
                  size={200}
                  level="H"
                  includeMargin
                  onClick={() => downloadQR(restaurant._id, restaurant.name)} // Trigger download on QR click
                />
                <Typography
                  variant="h6"
                  component="div"
                  align="center"
                  sx={{ mt: 2, mb: 1 }}
                >
                  {restaurant.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mb: 2 }}
                >
                  Location: {restaurant.location}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => downloadQR(restaurant._id, restaurant.name)}
                  size="small"
                >
                  Download QR
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QRCode;

