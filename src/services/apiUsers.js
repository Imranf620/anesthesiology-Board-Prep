import { catchAsync } from '../utils/catchAsync';
import { API } from '../utils/api';

// Get User profile
export const getProfile = catchAsync(async () => {
  const res = await API.post('/fetchProfile', {
    username: localStorage.getItem('username'),
  });

  if (res.data.Error) throw Error(res.data.Error);
  return res.data;
});

// Get client secret
export const getClientSecret = catchAsync(async data => {
  const res = await API.post('/createPayment', data);
  if (res.data.Error) throw res.data.Error;

  return res.data.client_secret;
});




export const updateProfile = catchAsync(async (profileData) => {
  try {
    console.log('Profile data being sent:', profileData);

    const res = await API.post('/updateProfile', profileData);

    console.log('Response from API:', res.data);

    if (res.data.Error) throw new Error(res.data.Error);

    return res.data;
  } catch (error) {
    console.error('Error updating profile:', error.response ? error.response.data : error.message);
    throw error;
  }
});

export const updatePassword = catchAsync(async (data) => {
  const res = await API.post('/updatePassword', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res.data;
});



