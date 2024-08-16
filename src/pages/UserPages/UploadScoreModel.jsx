import React, { useState, useEffect, useRef } from 'react';
import { MdClose } from 'react-icons/md'; // Import close icon from react-icons

const UploadScoreModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState({ value: 'pass_guarantee', text: 'Pass Guarantee' });
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOptionChange = (e) => {
    const { value, id } = e.target;
    const text = id === 'pass_guarantee' ? 'Pass Guarantee' : 'Help Us Improve';
    setSelectedOption({ value, text });
  };

  const handleSubmit = () => {
    // Add your backend submission logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-auto max-h-[80vh] overflow-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <MdClose size={24} />
        </button>
        <h2 className="text-xl mb-4">Upload Score</h2>
        <h1>
          Exam: <span className='text-lg font-semibold'> Anesthesiology ABA Advanced</span>
        </h1>
        <div className='flex flex-col gap-5 my-2'>
          <div>
            <input
              className='cursor-pointer'
              type="radio"
              id="pass_guarantee"
              value="pass_guarantee"
              checked={selectedOption.value === 'pass_guarantee'}
              onChange={handleOptionChange}
            />
            <label className='cursor-pointer' htmlFor="pass_guarantee">
              Pass Guarantee
            </label>
            <p>If you did not pass your exam, you may upload your score report to take advantage of our pass guarantee. The guarantee applies only to retail subscription purchases of 90 days or longer. Subscriptions purchased institutionally do not qualify for the pass guarantee. The pass guarantee can only be honored one time per subscription that is purchased.</p>
          </div>

          <div>
            <input
              type="radio"
              id="help"
              value="help"
              checked={selectedOption.value === 'help'}
              onChange={handleOptionChange}
              className='cursor-pointer'
            />
            <label className='cursor-pointer' htmlFor="help">
              Help Us Improve
            </label>
            <p>By confidentially providing your exam score, you are assisting TrueLearn in developing helpful features to help you and your colleagues learn more effectively and efficiently.</p>
          </div>
        </div>

        <div
          className="border-dashed gap-2 flex flex-col border-2 border-gray-300 p-4 mb-4 text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p>Drag and drop your file here</p>
          <p>or</p>
          <input
            type="file"
            className="hidden"
            id="fileUpload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileUpload"
            className="mt-2 px-3 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Select File
          </label>
          {file && <p className="mt-4">Selected file: {file.name}</p>}
        </div>
        
        <div className='flex gap-3'>
          <button onClick={handleSubmit} className="mt-4 px-3 py-2 bg-blue-500 text-white rounded">Submit</button>
          <button onClick={onClose} className="mt-4 px-3 py-2 bg-gray-500 text-white rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UploadScoreModal;
