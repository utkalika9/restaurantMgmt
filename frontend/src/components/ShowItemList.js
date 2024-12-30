import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Container, Grid, CircularProgress, Box } from '@mui/material';

import ItemsCard from './ItemsCard';

function ShowItemList() {
  const [items, setItems] = useState([]); // Ensure default state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://restaurantmgmt-qrcz.onrender.com/api/restaurant" )
      .then((res) => {
        if (Array.isArray(res.data)) {
          console.log(res)
          setItems(res.data); // Ensure data is an array
        } else {
          console.error('Unexpected data format:', res.data);
          setError('Unexpected data format received from the server.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching items:', err);
        setError('Failed to fetch items. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" color="primary" gutterBottom>
        Items List
      </Typography>

      <Button
        component={Link}
        to="/show-restaurant"
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
          {items.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary">
                No items found! Add some items to get started.
              </Typography>
            </Grid>
          ) : (
            items.map((restaurant,index)=>(
             <Grid item xs={12} sm={6} md={4} key={index}>
                 {console.log(restaurant)}
                <ItemsCard restaurant={restaurant} />
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

export default ShowItemList;
