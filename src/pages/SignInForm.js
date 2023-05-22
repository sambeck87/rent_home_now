import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
  getUser,
  getUserError,
  getUserStatus,
  signInUser,
} from '../redux/user/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const toastId = React.useRef(null);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userStatus = useSelector(getUserStatus);
  const userError = useSelector(getUserError);
  const userData = useSelector(getUser);
  if (userError && !userStatus) {
    toast.update(toastId.current, {
      type: toast.TYPE.ERROR,
      render: userError,
    });
  }

  if (userData?.name) {
    toast.update(toastId.current, {
      type: toast.TYPE.SUCCESS,
      render: `Welcome ${userData.name}!`,
    });
    navigate('/');
  }

  const loginUser = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (userStatus) {
    toastId.current = toast.info('Sending signup request!', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'light',
    });
  }

  return (
    <div className="max_width d-flex flex-column back_bg vh-100">
      <div className="max_width d-flex flex-column justify-content-center top_width align-self-center mt-5">
        <img
          className="logo align-self-center"
          src="https://i.ibb.co/0y72cpt/image.png"
          alt="Logo"
        />
        <h2 className="text-center my-5">Sign in to your account</h2>
        <div className="bg-white rounded-4 auth_form">
          <form
            className="my-3"
            onSubmit={loginUser}
          >
            <label
              htmlFor="email"
              className="max_width px-3 mt-3"
            >
              Email Address
              <br />
              <input
                className="max_width form-control form-control-lg"
                type="email"
                id="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <br />

            <label
              htmlFor="password"
              className="max_width px-3 mt-4 mb-4"
            >
              Password
              <br />
              <input
                className="max_width form-control form-control-lg"
                type="password"
                id="password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <br />
            <button
              type="submit"
              className="btn primary_bg text-white lg_button no_hover"
            >
              Sign In
            </button>

            <p className="text-center mt-4">
              Not registered?
              <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
