import React, { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const ReviewModal = ({ onClose, title }) => {
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const maxChars = 2000;

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

  const handleSubmit = () => {
    if (feedbackType && feedbackText) {
      toast.success('Feedback submitted successfully!');
      setFeedbackText('');
      setFeedbackType('');
    } else {
      toast.error('Please fill out both fields before submitting.');
    }
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="relative w-3/4 max-h-[90vh] rounded-lg bg-white p-6 shadow-lg md:w-1/2 lg:w-1/2 overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          <FaXmark
            size={24}
            className="cursor-pointer text-gray-600 transition hover:text-gray-800"
            onClick={onClose}
          />
        </div>
        <div className="p-6 w-full bg-white rounded shadow-md">
          <label htmlFor="select" className="block mb-2 font-medium">
            Feedback Type:
          </label>
          <select
            id="select"
            value={feedbackType}
            onChange={handleFeedbackTypeChange}
            className="block w-full mb-4 p-2 border rounded"
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
          <h1 className="mb-2 font-medium">Please enter feedback here:</h1>
          <textarea
            placeholder="Type here..."
            className="ring-1 ring-black rounded w-full px-5 py-2 h-80 outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={feedbackText}
            onChange={handleFeedbackTextChange}
          ></textarea>
          <div className="flex justify-between mb-4 text-sm">
            <span>{maxChars - feedbackText.length} characters remaining</span>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
            >
              Clear All
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
