import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getDetails = createAsyncThunk(
  'rent-home-now/DETAILS',
  async (id) => {
    const response = await fetch(
      `http://127.0.0.1:4000/api/v1/properties/${id}`,
    );
    const data = await response.json();
    return data;
  },
);

const detailsSlice = createSlice({
  name: 'details',
  initialState: {},

  extraReducers: {
    [getDetails.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
      };
      return newState;
    },
  },
});

export const fullDetails = (state) => state.details;
export const getReservationCriteria = (state) => state.details.reservation_criteria;
export const getPropertyReservations = (state) => state.details.reservation;
export default detailsSlice.reducer;
