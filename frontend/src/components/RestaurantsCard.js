import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const RestaurantsCard = ({ restaurant }) => {
  return (
    <Card
      component={Link} // Make the entire card a clickable link
      to={`/show-restaurant/${restaurant._id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        borderRadius: 2,
        boxShadow: 3,
        textDecoration: 'none', // Remove underline from the link
        color: 'inherit', // Inherit text color
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      <img
        src="https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"
        alt="Restaurants"
        style={{ height: 200, objectFit: 'cover', width: '100%' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" color="primary" gutterBottom>
          {restaurant.name || 'Unknown Name'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {restaurant.phonenumber || 'Phone number unavailable'}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {restaurant.location || 'Location not provided'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RestaurantsCard;
