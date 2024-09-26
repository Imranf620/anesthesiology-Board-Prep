import { MdOutlineEventNote } from 'react-icons/md';
import { useGetAllQuestions } from '../QuestionSearch/useGetAllQuestions';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { getNotes } from '../../services/apiNotes';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

const NoteDetails = ({ note = '' }) => {
  const { allQuestions, isLoading } = useGetAllQuestions();
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get('id');

  useEffect(() => {
    const getData = async () => {
      try {
        const username = localStorage.getItem('username');
        const res = await getNotes({ username });
        const allNotes = res.data.Notes;

        console.log('Fetched Notes:', allNotes);
        console.log('Query ID:', questionId);

        const idToCompare = Number(questionId);

        const data = allNotes.find(
          item => item.id || item.questionID === idToCompare,
        );
        setSelectedNote(data || null);

        console.log('Selected Note:', data);
      } catch (error) {
        toast.error(error.message, { autoClose: 2000 });
      }
    };

    if (note === '' && questionId) {
      getData();
    } else if (note !== '') {
      setSelectedNote(note);
    }
  }, [note, questionId]);

  if (selectedNote === null) {
    return <p>Note not found.</p>;
  }

  const question = allQuestions?.questions?.find(
    ques => ques.id === +selectedNote.questionID,
  );

  return (
    <div>
      <h1 className="flex items-center justify-center gap-3 bg-primary-500 py-2 text-[1.5rem] font-[500] text-white">
        <MdOutlineEventNote />
        <span>Note</span>
      </h1>

      <div className="my-4 flex flex-col gap-4 px-5">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <h3 className="font-[600]">Topic: {selectedNote.topic} </h3>
            <p>{selectedNote.description}</p>

            {question && (
              <>
                <h3 className="font-[600]">Question ID: {question.id}</h3>
                <p className="font-[400]">
                  Question Statement: {question.Statement}
                </p>
                <h3 className="font-[600]">Chapter: {question.Chapter}</h3>
              </>
            )}

            <h3 className="font-[600]">
              Date & Time: {new Date(selectedNote.createdAt).toLocaleString()}
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
