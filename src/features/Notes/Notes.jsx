import Button from '../../components/UI/Button';
import Menu from '../../components/UI/Menu';
import Table from '../../components/UI/Table';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal';
import ConfirmDelete from '../../components/UI/ConfirmDelete';
import NoteDetails from './NoteDetails';
import { getNotes } from '../../services/apiNotes';  
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useDeleteNote } from './useDeleteNote';  // Import your custom hook

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
  const { deleteNote, isLoading: isDeleting } = useDeleteNote();  // Use the custom hook

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes({ username });
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
      if (isChecked) setSelected(notes.map(itm => itm.questionID));
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
      await deleteNote(id);  // Use the custom hook
      toast.success('Note successfully deleted!', { autoClose: 2000 });
      setNotes(prevNotes => prevNotes.filter(note => note.questionID !== id));
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
          <th className="bg-primary-100 px-4 py-2 text-left w-[15%]">
            <CheckedInput
              id="select-all"
              onChange={handleChange}
              label="Topic"
              selected={selected}
            />
          </th>
          <th className="bg-primary-100 w-[40%]">Notes</th>
          <th className="bg-primary-100 w-[20%]">Date Modified</th>
          <th className="bg-primary-100 w-[15%]">Question ID</th>
          <th className="bg-primary-100 w-[10%]">View</th>
          <th className="bg-primary-100 w-[10%]"></th>
        </Table.Head>
        <Table.Body>
          {notes.map(itm => (
            <Table.Row key={itm.questionID} className="text-center">
              <Table.Data>
                <CheckedInput 
                  label={itm.topic}
                  id={itm.questionID}
                  onChange={handleChange}
                  selected={selected}
                />
              </Table.Data>
              <Table.Data className='w-full text-center'>{itm.description}</Table.Data>
              <Table.Data>{new Date(itm.createdAt).toLocaleDateString()}</Table.Data>
              <Table.Data className="text-center">{itm.questionID}</Table.Data>
              <Table.Data>
                <Modal>
                  <Modal.Open id="note">
                    <Button variant="underline">Edit</Button>
                  </Modal.Open>
                  <Modal.Window id="note" closeOnOverlay>
                    <NoteDetails note={itm} />
                  </Modal.Window>
                </Modal>
              </Table.Data>
              <Table.Data>
                <div className="relative">
                  <Menu>
                    <Menu.Toggle>
                      <button className="rounded-full p-2 text-[1.3rem] hover:bg-gray-200">
                        <HiOutlineDotsVertical />
                      </button>
                    </Menu.Toggle>
                    <Menu.List className="gap-2 ">
                      <li>
                        <button
                          className="w-full px-4 py-2 text-start hover:bg-primary-100"
                          onClick={() =>
                            handleGoToQuestion(itm.questionID, itm.userTestID)
                          }
                        >
                          Go to Question
                        </button>
                      </li>
                      <li>
                        <Modal>
                          <Modal.Open id="note-del">
                            <button className="w-full px-4 py-2 text-start text-red-400 hover:bg-red-50">
                              Delete Note
                            </button>
                          </Modal.Open>
                          <Modal.Window id="note-del" center>
                            <ConfirmDelete
                              isLoading={isDeleting}
                              message="Are you sure you want to delete this Note?"
                              onConfirm={() => handleDeleteNote(itm.questionID)}
                            />
                          </Modal.Window>
                        </Modal>
                      </li>
                    </Menu.List>
                  </Menu>
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
