
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { Container } from '@mui/material';

import axios from 'axios';

const CreateRest = (props) => {
  const navigate = useNavigate();
  const [description,setDescription] = useState({
    name: '',
    phonenumber:'' ,
    location:'',
    date:''
  });
  const [showToast, setShowToast] = useState(false);

  const onChange = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://5000-utkalika9-restaurantmgm-tz19hdj2teq.ws-us117.gitpod.io/api/restaurant', description)
//      .post('/api/restaurant', description)
      .then((res) => {
        setDescription({
          name: '',
          phonenumber:'' ,
          location:'',
          date:''
        });

        // Show the success alert
        toast.success('You are added successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          // pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });

        // Delay the navigation slightly to allow the toast to be seen
        setTimeout(() => {
          setShowToast(false); // Hide the toast
          navigate('/'); // Navigate to homepage
        }, 2000); // Adjust the timeout as needed

      })
      .catch((err) => {
        console.log('Error in CreateRest!');
        console.log('The error is -> ')
        console.log(err)
        // Show the success alert
        toast.error('Something went wrong, try again!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      });
  };

  return (
    <div className='CreateRest'>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />

      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/show-restaurant' className='btn btn-outline-warning float-left'>
              Show Order List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Info</h1>
            <p className='lead text-center'>Create New Page</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Enter your Name'
                  name='name'
                  className='form-control'
                  value={description.name}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='number'
                  placeholder='Enter your Phone Number'
                  name='phonenumber'
                  className='form-control'
                  value={description.phonenumber}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  placeholder='Enter your address'
                  name='location'
                  className='form-control'
                  value={description.location}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='date'
                  placeholder='Enter date'
                  name='date'
                  className='form-control'
                  value={description.date}
                  onChange={onChange}
                />
              </div>
              <br />

              <input
                type='submit'
                className='btn btn-outline-warning btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>


    </div>
  );
};

export default CreateRest;
