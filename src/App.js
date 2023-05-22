import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import Details from './pages/Details';
import DefaultLayout from './layouts/DefaultLayout';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import AddReservation from './pages/AddReservation';
import NewProperty from './pages/NewProperty';
import MyReservations from './pages/MyReservations';
import { getAccessToken, userReservations } from './redux/user/userSlice';
import { fetchProperties, selectProperties } from './redux/properties/propertiesSlice';
import MyProperty from './pages/MyProperty';

const App = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const properties = useSelector(selectProperties);

  useEffect(() => {
    if (accessToken !== '') {
      dispatch(userReservations(accessToken));
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  if (!properties.data) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/signup"
            element={<SignUpForm />}
          />
          <Route
            path="/signin"
            element={<SignInForm />}
          />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-property" element={<MyProperty />} />
          <Route path="/new-property" element={<NewProperty />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route
            path="/details/:id/"
            element={<Details />}
          />
          <Route path="reservations/new" element={<AddReservation />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
