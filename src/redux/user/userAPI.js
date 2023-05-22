import { addUSER, removeUSER } from './user';

const SIGNUP = 'http://127.0.0.1:4000/api/v1/auth/sign_up';
const SIGNIN = 'http://127.0.0.1:4000/api/v1/auth/sign_in';
const CHANGEPASS = '';
const RECOVER = '';

export const login = (data) => async (dispatch) => {
  const response = await fetch(SIGNIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    const data = await response.json();
    dispatch(addUSER({ data }));
  } else {
    alert('Something went wrong, please verify your data and try again');
  }
};

export const signup = (data, navigate) => async () => {
  try {
    const requestBody = {
      user: {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        avatar: data.avatar,
      },
    };

    const response = await fetch(SIGNUP, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 201) {
      navigate('/signin');
    } else {
      alert('Something went wrong, please fill all the fields correctly and try again');
      navigate('/signup');
    }
  } catch (error) {
    alert('Something went wrong, please try again');
  }
};

export const changepass = (data, navigate) => async () => {
  const response = await fetch(CHANGEPASS, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 201) {
    alert('Something went wrong, please try again');
    navigate('/SignUp');
  } else {
    navigate('/login');
  }
};

export const recover = (data, navigate) => async () => {
  const response = await fetch(RECOVER, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 201) {
    alert('Something went wrong, please verify you have an account and try again');
    navigate('/SignUp');
  } else {
    navigate('/login');
  }
};

export const logout = (id, token) => async (dispatch) => {
  const response = await fetch(`SIGNUP/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  if (response.status === 200) {
    dispatch(removeUSER(id));
  }
};
