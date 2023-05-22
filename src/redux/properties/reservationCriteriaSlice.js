/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createReservationCriteria = createAsyncThunk(
  'reservationCriteria/createReservationCriteria',
  async (reservationCriteriaData) => {
    const response = await fetch('http://127.0.0.1:4000/api/v1/reservation_criterias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationCriteriaData),
    });
    const data = await response.json();
    return data;
  },
);

const reservationCriteriaSlice = createSlice({
  name: 'reservationCriteria',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservationCriteria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservationCriteria.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createReservationCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reservationCriteriaSlice.reducer;
