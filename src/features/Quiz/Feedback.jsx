import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addFeedback } from '../../services/feedback.js'; 
import { useLocation } from 'react-router-dom';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const maxChars = 2000;
  const location = useLocation();
  const [questionId, setQuestionId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const questionIdFromUrl = queryParams.get('questionId');
    setQuestionId(questionIdFromUrl);
  }, [location]);

  const handleFeedbackTypeChange = (e) => {
    setFeedbackType(e.target.value);
  };

  const handleFeedbackTextChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setFeedbackText(e.target.value);
    }
  };

  const handleClear = () => {
    setFeedbackType('');
    setFeedbackText('');
  };

  const handleSubmit = async () => {
    if (!feedbackType || !feedbackText || !questionId) {
      toast.error('Please fill out all fields');
      return;
    }

    const feedbackData = {
      username: localStorage.getItem('username') || 'admin',
      questionID: questionId,
      feedback: feedbackText,
    };

    try {
      const response = await addFeedback(feedbackData);
      toast.success(response?.data?.Message)
      
      setFeedbackType('');
      setFeedbackText('');
    } catch (error) {
      toast.error('Error submitting feedback: ' + error?.message);
    }
  };

  return (
    <div className='mt-8 p-6 w-full bg-white rounded shadow-md'>
      <h1 className='font-semibold text-lg mb-4'>Feedback</h1>
      <p className='mb-4'>
        Submit feedback about the question to our content experts. If you have concerns or issues with the platform, please submit a ticket via the Contact Us options on your dashboard or <a href="#" className='text-blue-500 underline'>this link</a> for more immediate assistance.
      </p>
      <label htmlFor="select" className='block mb-2 font-medium'>
        Feedback Type:
      </label>
      <select
        id="select"
        value={feedbackType}
        onChange={handleFeedbackTypeChange}
        className='block w-full mb-4 p-2 border rounded'
      >
        <option value="">--Select--</option>
        <option value="Typo, Grammar, formatting">Typo, Grammar, formatting</option>
        <option value="Flawed Question">Flawed Question</option>
        <option value="Incorrect Explanation">Incorrect Explanation</option>
        <option value="Incorrect Answer">Incorrect Answer</option>
        <option value="Exhibit Issue">Exhibit Issue</option>
        <option value="Artwork">Artwork</option>
        <option value="Praise">Praise</option>
      </select>
      <h1 className='mb-2 font-medium'>Please enter feedback here:</h1>
      <textarea
        placeholder='Type here...'
        className='ring-1 ring-black rounded w-full px-5 py-2 h-80 outline-none focus:ring-2 focus:ring-blue-500 mb-2'
        value={feedbackText}
        onChange={handleFeedbackTextChange}
      ></textarea>
      <div className='flex justify-between mb-4 text-sm'>
        <span>{maxChars - feedbackText.length} characters remaining</span>
      </div>
      <div className='flex justify-end gap-2'>
        <button 
          onClick={handleClear} 
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        >
          Clear All
        </button>
        <button 
          onClick={handleSubmit} 
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Feedback;
