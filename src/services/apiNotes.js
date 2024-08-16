import { API } from '../utils/api';
import { catchAsync } from '../utils/catchAsync';

export const getNotes = catchAsync(async data => {
  const res = await API.post('/getNotes', data);
  if (res.data.Error) throw Error(res.data.Error);

  return res;
});

export const createUpdateNote = catchAsync(async data => {
  const res = await API.post('/createUpdateNote', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});

export const deleteNote = catchAsync(async id => {
  const res = await API.post(`/deleteNote/${id}`, {
    username: localStorage.getItem('username'),
  });
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});
