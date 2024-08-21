import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdOutlineEventNote } from 'react-icons/md';
import { createUpdateNote } from '../../services/apiNotes'; // Import your API service

const NoteDetails = ({ note }) => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(note.description || '');

  useEffect(() => {
    setDescription(note.description || '');
  }, [note]);

  const handleSave = async () => {
    if (!note.userTestID) {
      toast.error('userTestID is missing. Cannot save the note.', { autoClose: 2000 });
      return;
    }

    try {
      const updatedNote = {
        username: localStorage.getItem('username'),
        questionID: note.questionID,
        userTestID: note.userTestID,  // Ensure this field is passed correctly
        bookmarkStatus: 'Y', 
        topic: note.topic,  // Keep the original topic unchanged
        description,  // Updated description
      };

      await createUpdateNote(updatedNote);
      toast.success('Note successfully updated!', { autoClose: 2000 });
      window.location.reload();
      setEditMode(false);
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  return (
    <div>
      <h1 className="flex items-center justify-center gap-3 bg-primary-500 py-2 text-[1.5rem] font-[500] text-white">
        <MdOutlineEventNote />
        <span>Note</span>
      </h1>
      <div className="my-4 flex flex-col gap-4 px-5">
        {editMode ? (
          <>
            <div>
              <label htmlFor="description" className="block text-lg font-medium">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                rows="5"
              />
            </div>
            <button
              onClick={handleSave}
              className="mt-4 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h3 className="font-[600]">Topic: {note.topic}</h3>
            <p>{description}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
