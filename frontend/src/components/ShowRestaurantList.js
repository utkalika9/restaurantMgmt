import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Container, Grid, CircularProgress, Box } from '@mui/material';

import RestaurantsCard from './RestaurantsCard';

function ShowRestaurantList() {
  const [restaurants, setRestaurants] = useState([]); // Ensure default state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://restaurantmgmt-qrcz.onrender.com/api/restaurant" )
      .then((res) => {
        if (Array.isArray(res.data)) {
          console.log(res)
          setRestaurants(res.data); // Ensure data is an array
        } else {
          console.error('Unexpected data format:', res.data);
          setError('Unexpected data format received from the server.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching restaurants:', err);
        setError('Failed to fetch restaurants. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>
        Restaurants List
      </Typography>

      <Button
        component={Link}
        to="/create-rest"
        color="primary"
        variant="contained"
        sx={{ mb: 4 }}
      >
        Add Data
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {restaurants.length === 0 ? (
            <Grid restaurant xs={12}>
              <Typography variant="h6" color="text.secondary">
                No restaurants found! Add some restaurants to get started.
              </Typography>
            </Grid>
          ) : (
            restaurants.map((restaurant,index)=>(
             <Grid item xs={12} sm={6} md={4} key={index}>
                 {console.log(restaurant)}
                <RestaurantsCard restaurant={restaurant} />
               </Grid>
            ))
            // items.map((restaurant, index) => (
            //   <Grid item xs={12} sm={6} md={4} key={index}>
            //     {console.log(restaurant)}
            //     <ItemsCard restaurant={restaurant} />
            //   </Grid>
            // ))
          )}
        </Grid>
      )}
    </Container>
  );
}

export default ShowRestaurantList;
