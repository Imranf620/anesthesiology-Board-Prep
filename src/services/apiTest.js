import { catchAsync } from '../utils/catchAsync';
import { API } from '../utils/api';
import { transformSubmitTestData } from '../utils/transformSubmitTestData';

// Create a New Test function
export const createTest = catchAsync(async data => {
  const currentDate = new Date();

  const formattedDate = `${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${(
    '0' + currentDate.getDate()
  ).slice(-2)}-${currentDate.getFullYear()}_${(
    '0' + currentDate.getHours()
  ).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${(
    '0' + currentDate.getSeconds()
  ).slice(-2)}`;

  data.test_date = formattedDate;

  if (data.testType.toLowerCase() === 'timed') {
    const testTimeSeconds = data.questionsCount * 60;
    const testTimeMinutes = String(data.questionsCount % 60).padStart(2, 0);
    const testTimeHours = String(
      Math.floor(testTimeSeconds / (60 * 60)),
    ).padStart(2, 0);
    data.testTime = `${testTimeHours}:${testTimeMinutes}:00`;
  }

  data.testName = `${data.testName} ${formattedDate}`;

  console.log('Data being sent to API:', data);
  const res = await API.post('/readyTest', data);
  if (res.data.Error) throw Error(res.data.Error);

  return res;
});

// Submit test function
export const submitTest = catchAsync(async inputData => {
  const data = transformSubmitTestData(inputData);
  const res = await API.post('/submitResult', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res;
});

// Resume Test function
export const resumeTest = catchAsync(async data => {
  const res = await API.post('/resumeTest', data);
  if (res.data.Error) throw Error(res.data.Error);
  return res.data;
});

// Save Test function
export const saveTest = catchAsync(async inputData => {
  const data = transformSubmitTestData(inputData);
  if (inputData.testTime) data.testTime = inputData.testTime;
  const res = await API.post('/saveTest', data);
  if (res.data.Error) throw Error(res.data.Error);
});
