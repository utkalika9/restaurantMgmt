import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update(props) {
  const [restaurant, setRestaurant] = useState({
    name: '',
    phonenumber: '',
    location: '',
    date: ''
  });

  const URL = process.env.REACT_APP_API_URL; // Access environment variable

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL}/api/restaurant/${id}`)
      .then((res) => {
        setRestaurant({
            name: res.data.name,
            phonenumber: res.data.phonenumber,
            location: res.data.location,
            date: res.data.date
        });
      })
      .catch((err) => {
        console.log('Error from Update GET request');
        console.log(err)
      });
  }, [id]);

  const onChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: restaurant.name,
      phonenumber: restaurant.phonenumber,
      location: restaurant.location,
      date: restaurant.date,
    };

    axios
      .put(`${URL}/api/restaurant/${id}`, data)
      .then((res) => {
        navigate(`/show-restaurant/${id}`);
      })
      .catch((err) => {
        console.log('Error in Update PUT request ->');
        console.log(err)
      });
  };

  return (
    <div className='Update'>
      
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit </h1>
            <p className='lead text-center'>Update Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                placeholder='name'
                name='name'
                className='form-control'
                value={restaurant.name}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='phonenumber'>Phone Number</label>
              <input
                type='number'
                placeholder='phonenumber'
                name='phonenumber'
                className='form-control'
                value={restaurant.phonenumber}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='location'>Address</label>
              <input
                type='text'
                placeholder='Address'
                name='location'
                className='form-control'
                value={restaurant.location}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='date'> Date</label>
              <input
                type='date'
                placeholder='Date'
                name='date'
                className='form-control'
                value={restaurant.date}
                onChange={onChange}
              />
            </div>
            <br />

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update 
            </button>
            <br /> <br />
          </form>
        </div>
      </div>

    </div>
  );
}

export default Update;