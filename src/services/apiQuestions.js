import { API } from '../utils/api';
import { catchAsync } from '../utils/catchAsync';

// Get all Questions function
export const getAllQuestions = catchAsync(async () => {
  const res = await API.post('/questionSearch', {
    username: localStorage.getItem('username'),
  });
  if (res.data.Error) throw Error(res.data.Error);
  return res.data;
});


// Add or Update Question Rating
export const addUpdateRateQuestion = catchAsync(async (questionId, ratingStatus) => {
  const res = await API.post('/addUpdateRateQuestion', {
    username: localStorage.getItem('username'),
    questionId,
    ratingStatus, // 'Y' for thumbs-up, 'N' for thumbs-down
  });
  
  if (res.data.Error) throw Error(res.data.Error);
  return res.data;
});