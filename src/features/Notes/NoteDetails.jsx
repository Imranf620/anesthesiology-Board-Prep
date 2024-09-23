import { MdOutlineEventNote } from 'react-icons/md';
import { useGetAllQuestions } from '../QuestionSearch/useGetAllQuestions';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const NoteDetails = ({ note }) => {
  const { allQuestions, isLoading } = useGetAllQuestions();

  const question = allQuestions?.questions?.find(
    ques => ques.id === +note.questionID,
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
            <h3 className="font-[600]">Topic: {note.topic} </h3>
            <p>{note.description}</p>

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
              Date & Time: {new Date(note.createdAt).toLocaleString()}
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
