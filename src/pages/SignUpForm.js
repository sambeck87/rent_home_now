import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    avatar: null,
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:4000/api/v1/auth/sign_up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      });

      if (response.ok) {
        await response.json();
        navigate('/signin');
      } else {
        alert('Something went wrong, please verify if you have an active account');
      }
    } catch (error) {
      alert('Something went wrong, please verify your data and try again');
    }
  };

  return (
    <div className="max_width d-flex flex-column back_bg vh-100">
      <div className="max_width d-flex flex-column justify-content-center top_width align-self-center mt-5">
        <img className="logo align-self-center" src="https://i.ibb.co/0y72cpt/image.png" alt="Logo" />
        <h2 className="text-center my-5">Sign up to your account</h2>
        <div className="bg-white rounded-4 auth_form">
          <form className="my-3" onSubmit={handleSubmit}>
            <label htmlFor="name" className="max_width px-3 mt-3">
              Full Name
              <br />
              <input
                className="max_width form-control form-control-lg"
                type="text"
                id="name"
                name="name"
                required
                onChange={handleChange}
              />
            </label>
            <br />

            <label htmlFor="name" className="max_width px-3 mt-4">
              Email Address
              <br />
              <input
                className="max_width form-control form-control-lg"
                type="email"
                id="email"
                name="email"
                required
                onChange={handleChange}
              />
            </label>
            <br />

            <label htmlFor="avatar" className="max_width px-3 mt-4">
              Avatar
              <br />
              <input
                className="max_width form-control form-control-lg"
                type="text"
                id="avatar"
                name="avatar"
                required
                onChange={handleChange}
              />
            </label>
            <br />

            <label htmlFor="password" className="max_width px-3 mt-4">
              Password
              <br />
              <input
                className="max_width form-control form-control-lg"
                type="password"
                id="password"
                name="password"
                required
                onChange={handleChange}
              />
            </label>
            <br />

            <label htmlFor="confirmPassword" className="max_width px-3 mt-4 mb-4">
              Confirm Password
              <br />
              <input
                className="max_width form-control form-control-lg"
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                required
                onChange={handleChange}
              />
            </label>
            <br />

            <button type="submit" value="add-tour" className="btn primary_bg text-white lg_button no_hover">
              Sign Up
            </button>
            <p className="text-center mt-4">
              Already registered?
              <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
