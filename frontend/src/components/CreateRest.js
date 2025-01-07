import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { Grid, Typography, TextField, Button, Box, Paper, Container } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CreateRest = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState({
    name: '',
    phonenumber: '',
    location: '',
    date: ''
  });

  const onChange = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!description.name || !description.phonenumber || !description.location || !description.date) {
      toast.error('Please fill all the fields!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    axios
      .post('https://restaurantmgmt-qrcz.onrender.com/api/restaurant', description)
      .then((res) => {
        setDescription({
          name: '',
          phonenumber: '',
          location: '',
          date: ''
        });

        toast.success('You are added successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((err) => {
        console.error('Error in CreateRest!', err);
        toast.error('Something went wrong, try again!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <ToastContainer />
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }} align="center">
          Add Restaurant Info
        </Typography>

        <Box component="form" onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={description.name}
                onChange={onChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                type="number"
                name="phonenumber"
                value={description.phonenumber}
                onChange={onChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={description.location}
                onChange={onChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={description.date}
                onChange={onChange}
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }} textAlign="center">
          <Link to="/show-restaurant" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary">
              Show Order List
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateRest;
