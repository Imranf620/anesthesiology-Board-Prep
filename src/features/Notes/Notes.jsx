import Button from '../../components/UI/Button';
import Table from '../../components/UI/Table';
import { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal';
import ConfirmDelete from '../../components/UI/ConfirmDelete';
import NoteDetails from './NoteDetails';
import { getNotes } from '../../services/apiNotes';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useDeleteNote } from './useDeleteNote';
import EditNotes from './EditNotes';

const CheckedInput = ({ label, id, onChange, selected }) => {
  const isChecked = selected?.find(itm => itm === id);

  return (
    <div className="flex items-center gap-3">
      <input
        onChange={onChange}
        checked={isChecked}
        id={id}
        type="checkbox"
        className="h-4 w-4 accent-primary-500"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const username = localStorage.getItem('username');
  const { deleteNote, isLoading: isDeleting } = useDeleteNote();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes({ username });
        console.log('dataa', res);
        setNotes(res.data.Notes);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message, { autoClose: 2000 });
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [username]);

  const handleChange = e => {
    const id = e.target.id;
    if (id === 'select-all') {
      const isChecked = e.target.checked;
      if (isChecked) setSelected(notes.map(itm => itm.id));
      if (!isChecked) setSelected([]);
    } else {
      setSelected(prev => {
        const isExists = prev.find(itm => itm === id);
        if (isExists) {
          return prev.filter(itm => itm !== id);
        } else {
          return [...prev, id];
        }
      });
    }
  };

  const handleDeleteNote = async id => {
    try {
      await deleteNote(id); // Use the custom hook
      toast.success('Note successfully deleted!', { autoClose: 2000 });
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  const handleGoToQuestion = (quesId, testId) => {
    navigate(`/questions/${quesId}`);
  };

  return isLoading ? (
    <div className="my-20 flex justify-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="relative overflow-auto">
      {isDeleting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20">
          <LoadingSpinner />
        </div>
      )}
      <Table className="border-2">
        <Table.Head className="bg-primary-100 text-start text-[1.2rem]">
          <th className="w-[15%] bg-primary-100 px-4 py-2 text-left">
            <CheckedInput
              id="select-all"
              onChange={handleChange}
              label="Topic"
              selected={selected}
            />
          </th>
          <th className="w-[40%] bg-primary-100">Notes</th>
          <th className="w-[20%] bg-primary-100">Date Modified</th>
          <th className="w-[10%] bg-primary-100">Edit</th>
          <th className="w-[10%] bg-primary-100">View</th>
          <th className="w-[10%] bg-primary-100"></th>
        </Table.Head>
        <Table.Body>
          {notes.map(itm => (
            <Table.Row key={itm.id} className="text-center">
              <Table.Data>
                <CheckedInput
                  label={itm.topic}
                  id={itm.id}
                  onChange={handleChange}
                  selected={selected}
                />
              </Table.Data>
              <Table.Data className="w-full text-center">
                {itm.description}
              </Table.Data>
              <Table.Data>
                {new Date(itm.createdAt).toLocaleDateString()}
              </Table.Data>
              <Table.Data>
                <Modal>
                  <Modal.Open id="note">
                    <Button variant="underline">Edit</Button>
                  </Modal.Open>
                  <Modal.Window id="note" closeOnOverlay>
                    <EditNotes note={itm} />
                  </Modal.Window>
                </Modal>
              </Table.Data>
              <Table.Data>
                <Modal>
                  <Modal.Open id="note">
                    <Button variant="underline">View</Button>
                  </Modal.Open>
                  <Modal.Window id="note" closeOnOverlay>
                    <NoteDetails note={itm} />
                  </Modal.Window>
                </Modal>
              </Table.Data>
              <Table.Data>
                <div className="relative">
                  <Modal>
                    <Modal.Open id="note-del">
                      <Button
                        variant="delete"
                        className="rounded px-2 py-1 text-red-600"
                      >
                        Delete
                      </Button>
                    </Modal.Open>
                    <Modal.Window id="note-del" center>
                      <ConfirmDelete
                        isLoading={isDeleting}
                        message="Are you sure you want to delete this Note?"
                        onConfirm={() => handleDeleteNote(itm.id)}
                      />
                    </Modal.Window>
                  </Modal>
                </div>
              </Table.Data>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Notes;
