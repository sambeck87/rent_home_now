import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getProperties = createAsyncThunk(
  'rent-home-now/PROPERTIES',
  async () => {
    const response = await fetch(
      'http://127.0.0.1:4000/api/v1/properties',
    );
    const data = await response.json();
    return data;
  },
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
  },

  extraReducers: {
    [getProperties.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
      };
      return newState;
    },
  },
});

export const fullDetails = (state) => state.details;
export default propertiesSlice.reducer;
