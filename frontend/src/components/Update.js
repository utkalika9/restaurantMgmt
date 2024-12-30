
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update(props) {
  const [item, setItem] = useState({
    name: '',
    phonenumber: '',
    address: '',
    date: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://restaurantmgmt.onrender.com/api/restaurant/${id}`)
      .then((res) => {
        setItem({
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
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: item.name,
      phonenumber: item.phonenumber,
      address: item.address,
      date: item.date,
    };

    axios
      .put(`https://restaurantmgmt.onrender.com/api/restaurant/${id}`, data)
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
                value={item.name}
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
                value={item.phonenumber}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='address'>address</label>
              <input
                type='text'
                placeholder='Address'
                name='address'
                className='form-control'
                value={item.address}
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
                value={item.date}
                onChange={onChange}
              />
            </div>
            <br />

            <button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
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
