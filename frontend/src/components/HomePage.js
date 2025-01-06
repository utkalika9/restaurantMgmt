// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Fade,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DownloadIcon from '@mui/icons-material/Download';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import axios from 'axios';

const HomePage = () => {
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    uniqueLocations: 0,
    recentRestaurant: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://restaurantmgmt-qrcz.onrender.com/api/restaurant')
      .then((res) => {
        console.log('API response:', res.data);
        const restaurant = Array.isArray(res.data) ? res.data : [];
        const uniqueLocations = new Set(restaurant.map((r) => r.location)).size;
        const recentRestaurant = restaurant.sort((a, b) =>
          new Date(b.added_date) - new Date(a.added_date)
        )[0];
  
        setStats({
          totalRestaurants: restaurant.length,
          uniqueLocations,
          recentRestaurant,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Welcome Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" color="primary" gutterBottom>
            Welcome to Restaurant Management System
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Manage and organize your restaurants seamlessly
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={4} mb={6}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                <RestaurantMenuIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  {stats.totalRestaurants}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Total Restaurants
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                <LocationOnIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  {stats.uniqueLocations}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Unique Locations
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                <CalendarTodayIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  Latest Restaurant
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stats.recentRestaurant?.name || 'No restaurants yet'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Available Features
          </Typography>
        </Box>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Button
              component={Link}
              to="/show-restaurant"
              variant="contained"
              size="large"
              startIcon={<RestaurantMenuIcon />}
              fullWidth
              sx={{ py: 2 }}
            >
              View Restaurants
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              component={Link}
              to="/create-rest"
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              fullWidth
              sx={{ py: 2 }}
            >
              Add New Restaurant
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              component={Link}
              to="/export"
              variant="contained"
              size="large"
              startIcon={<DownloadIcon />}
              fullWidth
              sx={{ py: 2 }}
            >
              Export Data
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              component={Link}
              to="/qr-code"
              variant="contained"
              size="large"
              startIcon={<QrCodeIcon />}
              fullWidth
              sx={{ py: 2 }}
            >
              QR Codes
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              component="a"
              href="https://github.com/utkalika9/restaurantMgmt"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              startIcon={<GitHubIcon />}
              fullWidth
              sx={{ py: 2 }}
            >
              GitHub
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              component={Link}
              to="/search"
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              fullWidth
              sx={{ py: 2 }}
            >
              Search Restaurants
            </Button>
          </Grid>

        </Grid>
      </Container>
    </Fade>
  );
};

export default HomePage;