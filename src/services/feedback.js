import { API } from '../utils/api';
import { catchAsync } from '../utils/catchAsync';

export const addFeedback = catchAsync(async (data) => {
  const res = await API.post('/addFeedback', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});

export const getFeedback = catchAsync(async (data) => {
  const res = await API.post('/getFeedback', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res.data;
})

export const deleteFeedback = catchAsync(async (feedbackId) => {
  const res = await API.post('/deleteFeedbackAdmin', {
    username: localStorage.getItem('username'),
    feedbackId,
  });
  if (res.data.Error) throw Error(res.data.Error);
  return res.data;
});

