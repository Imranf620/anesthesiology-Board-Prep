import { API } from '../utils/api';
import { catchAsync } from '../utils/catchAsync';

// Login
export const login = catchAsync(async data => {
  const res = await API.post('/login', data);
  if (res.data.Error) throw new Error(res.data.Error);

  return res;
});

// Signup function
export const signup = catchAsync(async data => {
  const res = await API.post('/signup', data);
  if (res.data.Error) throw new Error(res.data.Error);
  return res.data;
});

// Logout function
export const logout = catchAsync(async () => {
  const res = await API.post(
    '/logout',
    {
      username: localStorage.getItem('username'),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});

// Verify token function
export const verifyToken = async () => {
  try {
    const res = await API.post(
      '/protected',
      {
        username: localStorage.getItem('username'),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    if (res.data.Error) throw Error(res.data.Error);
    return res.data.message;
  } catch (err) {
    console.log(err);
  }
};

// Login with google
export const loginGoogle = catchAsync(async data => {
  const res = await API.post('/signin/google', data);
  if (res.data.Error) throw new Error(res.data.Error);
  return res;
});
