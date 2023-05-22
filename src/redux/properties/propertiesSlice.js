import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const updateProperty = createAsyncThunk(
  'rent-home-now/UPDATE_PROPERTY',
  async (propertyData) => {
    const response = await fetch(`http://127.0.0.1:4000/api/v1/properties/${propertyData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  },
);

export const createProperty = createAsyncThunk(
  'rent-home-now/CREATE_PROPERTY',
  async (propertyData) => {
    const response = await fetch('http://127.0.0.1:4000/api/v1/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: propertyData.userAccessToken,
      },
      body: JSON.stringify(propertyData.property),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  },
);

export const fetchCategories = createAsyncThunk(
  'rent-home-now/CATEGORIES',
  async () => {
    const response = await fetch('http://127.0.0.1:4000/api/v1/categories');
    const data = await response.json();
    return data;
  },
);

export const fetchProperties = createAsyncThunk(
  'rent-home-now/PROPERTIES',
  async () => {
    const response = await fetch('http://127.0.0.1:4000/api/v1/properties');
    const data = await response.json();
    return data;
  },
);

export const getPropertiesByUser = createAsyncThunk(
  'rent-home-now/PROPERTIES_BY_USER',
  // eslint-disable-next-line no-unused-vars
  async (userId) => {
    const response = await fetch(
      // `http://127.0.0.1:4000/api/v1/users/${userId}/properties`,
      'http://127.0.0.1:4000/api/v1/properties',
    );
    const data = await response.json();
    return data;
  },
);

export const deleteProperty = createAsyncThunk(
  'rent-home-now/DELETE_PROPERTY',
  async (propertyData) => {
    const response = await fetch(
      `http://127.0.0.1:4000/api/v1/properties/${propertyData.propertyId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: propertyData.userAccessToken,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to delete property');
    }
  },
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    loading: false,
    error: null,
    data: [],
    categories: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchProperties.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        data: action.payload,
      }))
      .addCase(fetchProperties.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }))
      .addCase(getPropertiesByUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getPropertiesByUser.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        data: action.payload,
      }))
      .addCase(getPropertiesByUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }))
      .addCase(deleteProperty.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deleteProperty.fulfilled, (state, action) => {
        const newState = {
          ...state,
        };
        newState.loading = false;
        const deletedPropertyId = action.meta.arg;
        newState.data = state.data.filter(
          (property) => property.id !== deletedPropertyId,
        );
        return newState;
      })
      .addCase(deleteProperty.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }))
      .addCase(fetchCategories.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchCategories.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        categories: action.payload,
      }))
      .addCase(fetchCategories.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }))
      .addCase(updateProperty.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(updateProperty.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        data: state.data.map(
          (property) => (property.id === action.payload.id ? action.payload : property),
        ),
      }))
      .addCase(updateProperty.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});

export const fullDetails = (state) => state.details;
export default propertiesSlice.reducer;
export const selectProperties = (state) => state.properties;
export const selectPropertiesWithNamesAndIds = (state) => state.properties.data.map((property) => ({
  id: property.id,
  name: property.name,
}));
export const selectCategories = (state) => state.properties.categories;
