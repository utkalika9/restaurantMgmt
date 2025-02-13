import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  Divider,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const ShowRestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/restaurant/${id}`)
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowRestaurantDetails');
      });
  }, [id]);

  const onDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`/api/restaurant/${id}`)
      .then((res) => {
        navigate('/show-restaurant');
      })
      .catch((err) => {
        console.log('Error from ShowRestaurantDetails_deleteClick');
      });
    setOpenDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md">
      <StyledPaper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 400, mx: 'auto' }}> {/* Adjust width */}
              <CardMedia
                component="img"
                sx={{
                  height: 300, // Adjust height
                  width: '100%', // Ensure full width
                  objectFit: 'cover', // Maintain aspect ratio
                  borderRadius: 2, // Optional: rounded corners
                }}
                image="https://s.hdnux.com/photos/01/41/73/77/25673711/3/rawImage.jpg"
                alt={restaurant.title}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {restaurant.name}
            </Typography>
            <Divider sx={{ my: 2 }} />

            {/* Display restaurant details */}
            <Box display="flex" flexDirection="column">
              <Typography variant="body1" paragraph>
                {restaurant.location}
              </Typography>
              <Typography variant="body1">Phone Number: {restaurant.phonenumber}</Typography>
              <Typography variant="body1">Address: {restaurant.location}</Typography>
              <Typography variant="body1">Date: {restaurant.date}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            startIcon={<ArrowBackIcon />}
            component={RouterLink}
            to="/show-restaurant"
            variant="outlined"
          >
            Back to Restaurant List
          </Button>
          <Box>
            <Button
              startIcon={<EditIcon />}
              component={RouterLink}
              to={`/edit/${restaurant._id}`}
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              Edit restaurant
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              onClick={onDeleteClick}
              variant="contained"
              color="error"
            >
              Delete restaurant
            </Button>
          </Box>
        </Box>
      </StyledPaper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Info? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ShowRestaurantDetails;
