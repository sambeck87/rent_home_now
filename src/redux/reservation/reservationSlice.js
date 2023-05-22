import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addReservation = createAsyncThunk(
  'reservation/addReservation',
  async (reservationData, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/reservations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: reservationData.userAccessToken,
          },

          body: JSON.stringify({
            reservation: reservationData.reservationData,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(
          errorData || 'Something went wrong',
        );
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservation: {},
    loading: false,
    error: null,
  },
  reducers: {
    removeReservation: (state) => {
      const newState = {
        ...state,
        loading: false,
        reservation: null,
      };
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReservation.pending, (state) => {
        const newState = {
          ...state,
          loading: true,
          error: null,
        };
        return newState;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        const newState = {
          ...state,
          loading: false,
          error: null,
          reservation: action.payload,
        };
        return newState;
      })
      .addCase(addReservation.rejected, (state, action) => {
        const newState = {
          ...state,
          loading: false,
          error: action.payload,
        };
        return newState;
      });
  },
});

export const getReservation = (state) => state.reservations.reservation;
export const getReservationStatus = (state) => state.reservations.loading;
export const getReservationError = (state) => state.reservations.error;
export const { removeReservation } = reservationSlice.actions;

export default reservationSlice.reducer;
