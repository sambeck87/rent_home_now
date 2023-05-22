import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './user/userSlice';
import details from './details/GetDetails';
import propertiesReducer from './properties/propertiesSlice';
import reservationReducer from './reservation/reservationSlice';
import addressReducer from './address/addressSlice';

const store = configureStore(
  {
    reducer: {
      user: userReducer,
      details,
      properties: propertiesReducer,
      reservations: reservationReducer,
      address: addressReducer,
    },
  },
  applyMiddleware(thunk),
);

export default store;
