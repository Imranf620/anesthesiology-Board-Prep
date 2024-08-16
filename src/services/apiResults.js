import { catchAsync } from '../utils/catchAsync';
import { API } from '../utils/api';

// Get user's result
export const getUserResults = catchAsync(async username => {
  const res = await API.post('/results', { username });

  if (res.data.Error) throw Error(res.data.Error);
  return res.data.results;
});
