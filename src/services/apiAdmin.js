import { API } from '../utils/api';
import { catchAsync } from '../utils/catchAsync';

import axios from 'axios';

// Get Users
export const getUsers = catchAsync(async data => {
  const res = await API.post('/fetchUsers', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res.data;
});

// Add question to DB funciton
export const addQuestionToDB = catchAsync(async data => {
  const res = await API.post('/addQuestion', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});

// Add questions from file to DB
export const addQuestionBulk = catchAsync(async data => {
  data.questionsList.map(itm => {
    itm['Contributor Initials'] = 'TEST';
    delete itm.c;
  });

  const res = await API.post('/addQuestionsBulk', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});

// Fetch Payment Plans
export const getPaymentPlans = catchAsync(async data => {
  const res = await API.post('/fetchPaymentPlans', data);
  if (res.data.Error) throw res.data.Error;
  return res.data.Payment_Plans;
});

// Create payment plan
export const createPaymentPlan = catchAsync(async data => {
  const res = await API.post('/addPaymentPlan', data);
  if (res.data.Error) throw res.data.Error;
  return res;
});

export const updatePaymentPlan = catchAsync(async (data) => {
  const res = await API.post('/updatePaymentPlan', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});



// Delete Payment plan
export const deletePaymentPlan = catchAsync(async data => {
  const res = await API.post('/deletePaymentPlan', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});

// Get Promotions
export const getPromotions = catchAsync(async () => {
  const res = await API.post('/promotions', {
    username: localStorage.getItem('username'),
  });
  if (res.data.Error) throw Error(res.data.Error);
  return res.data.PrmotionList;
});

// Create promotion
export const createPromotion = catchAsync(async data => {
  const res = await API.post('/createPromotions', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});

// delete promotion
export const deletePromotion = catchAsync(async data => {
  const res = await API.post('/deletePromotions', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});

// Get Log files Url
export const getLogFilesUrl = catchAsync(async () => {
  const res = await API.post('/getLogFiles', {
    username: localStorage.getItem('username'),
  });
  if (res.data.Error) throw Error(res.data.Error);
  return res.data.LogFiles;
});

// Get Log file
export const getLogFile = catchAsync(async url => {
  const res = await axios.get(url);
  return res.data;
});

// Get Financials
export const getFinancials = catchAsync(async (dateFrom, dateTo) => {
  const res = await API.post('/getFinancials', {
    username: localStorage.getItem('username'),
    dateFrom,
    dateTo,
  });
  if (res.data.Error) throw Error(res.data.Error);
  return res.data.Financials;
});


// Toggle user status
export const toggleUserStatus = catchAsync(async(data)=>{
  const res = await API.post('/toggleUserStatus',data);
  if(res.data.Error) throw Error(res.data.Error);

  return res;
})


export const updateUser = catchAsync(async (userData) => {
  const username = localStorage.getItem('username'); // Get username from localStorage
  
  const data = {
    ...userData,
    username, // Add username to the request data
  };

  const res = await API.post('/updateUserAdmin', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res.data;
});