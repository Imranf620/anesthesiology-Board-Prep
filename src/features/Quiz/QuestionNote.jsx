import React, { useState } from 'react';
import { IoIosCheckmark } from 'react-icons/io';
import { toast } from 'react-toastify';
import { createUpdateNote } from '../../services/apiNotes';

const QuestionNote = ({ questionID, userTestID, Topic }) => {
  const [text, setText] = useState('');
  const [previousNotes, setPreviousNotes] = useState([]);
  const maxChars = 2000;

  

  const handleTextChange = e => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };

  const handleSave = async () => {
    if (text.trim()) {
      const noteData = {
        username: localStorage.getItem('username'),
        questionID,
        userTestID,
        bookmarkStatus: 'N',  // Assuming you want to save it as bookmarked
        topic: Topic,   
        description: text,
      };

      try {
       const res = await createUpdateNote(noteData);
        setPreviousNotes([...previousNotes, text]);
        setText('');
        

        toast.success(res.data.Message,  { autoClose: 2000 });
      } catch (error) {
        toast.error('Failed to save note.');
      }
    } else {
      toast.error('Please enter some text before saving.');
    }
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="mt-20">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="pb-6 text-base font-semibold">Previous Notes:</div>
        <div className="mb-6 max-h-40 overflow-y-auto bg-gray-100 p-4 rounded">
          {previousNotes.length > 0 ? (
            previousNotes.map((note, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm text-gray-800">{note}</p>
                <hr className="my-2" />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No notes added yet.</p>
          )}
        </div>

        <h1 className="mb-4 text-base font-semibold">
          Please enter notes here:
        </h1>
        <div className="relative">
          <textarea
            placeholder="Type here..."
            className="h-80 w-full rounded px-5 py-2 outline-none ring-1 ring-black focus:ring-2 focus:ring-blue-500"
            value={text}
            onChange={handleTextChange}
          ></textarea>
          <IoIosCheckmark
            color="green"
            className="absolute right-4 top-2 text-3xl"
          />
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>{maxChars - text.length} characters remaining</span>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionNote;
