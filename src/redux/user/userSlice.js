import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (userData, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/auth/sign_in',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(
          errorData.error || 'Something went wrong',
        );
      }

      const responseData = await response.json();
      const { accessToken, user } = responseData.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      return responseData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const userReservations = createAsyncThunk(
  'auth/userReservations',
  async (userData, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:4000/api/v1/auth/me',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: userData,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(
          errorData.error || 'Something went wrong',
        );
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const checkLocalStorage = () => {
  const accessTokenLocal = localStorage.getItem('accessToken');
  const userJson = localStorage.getItem('user');
  const accessToken = accessTokenLocal === 'undefined' ? '' : accessTokenLocal;
  const user = userJson === 'undefined' ? null : JSON.parse(userJson);
  return { accessToken, user };
};

const { accessToken: accessTokenFromStorage, user: userFromStorage } = checkLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage,
    accessToken: accessTokenFromStorage,
    myReservation: [],
    myProperties: [],
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      const newState = {
        ...state,
        accessToken: null,
        user: null,
      };
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        const newState = {
          ...state,
          loading: true,
        };
        return newState;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        const newState = {
          ...state,
          loading: false,
          accessToken: action.payload.data.accessToken,
          user: action.payload.data.user,
        };
        return newState;
      })
      .addCase(signInUser.rejected, (state, action) => {
        const newState = {
          ...state,
          loading: false,
          error: action.payload,
        };
        return newState;
      })
      .addCase(userReservations.pending, (state) => {
        const newState = {
          ...state,
          loading: true,
        };
        return newState;
      })
      .addCase(userReservations.fulfilled, (state, action) => {
        const newState = {
          ...state,
          loading: false,
          myReservation: action.payload.data.myReservation,
          myProperties: action.payload.data.myProperties,
        };
        return newState;
      })
      .addCase(userReservations.rejected, (state, action) => {
        const newState = {
          ...state,
          loading: false,
          error: action.payload,
        };
        return newState;
      });
  },
});

export const getUser = (state) => state.user.user;
export const getAccessToken = (state) => state.user.accessToken;
export const getUserProperties = (state) => state.user.myProperties;
export const getUserReservations = (state) => state.user.myReservation;
export const getUserStatus = (state) => state.user.loading;
export const getUserError = (state) => state.user.error;
export const { logout } = authSlice.actions;

export default authSlice.reducer;
