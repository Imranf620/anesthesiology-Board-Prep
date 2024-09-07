import { useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNotes } from '../../services/apiNotes';
import { toast } from 'react-toastify';
import { FaRegBookmark } from 'react-icons/fa6';
import { TbNotes } from 'react-icons/tb';
import { QuizQuestionIconContext } from '../../context/QuizQuestionIconContext';

const QuizNavigate = ({ ques, index, state }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const questionOrder = +searchParams.get('questionOrder');
  const ref = useRef();
  const { iconState } = useContext(QuizQuestionIconContext);
  const [notes, setNotes] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes({ username });
        setNotes(res.data.Notes);
      } catch (error) {
        toast.error(error.message, { autoClose: 2000 });
      }
    };

    fetchNotes();
  }, [username, iconState]);

  // Check if option is selected or not
  const isOptionSelected = state?.options?.find(
    opt => opt.questionId === ques.QuestionID,
  );

  // Handle navigation
  const handleNavigation = index => {
    searchParams.set('questionOrder', index);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (ref.current && questionOrder === index)
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [ref, questionOrder, index]);

  // Determine if the question is bookmarked, noted, or both
  const note = notes?.find(note => note?.questionID === ques?.QuestionID);

  const isBookmarked = note?.bookmarkStatus === 'Y';
  const isNoted = note?.description ;

  // Style for selected options
  const style =
    isOptionSelected &&
    isOptionSelected.submitted &&
    isOptionSelected.option === ques.Correct
      ? 'bg-primary-200 border-none'
      : isOptionSelected &&
          isOptionSelected.submitted &&
          isOptionSelected?.option !== ques.Correct
        ? 'bg-red-500 border-none'
        : isOptionSelected?.option
          ? 'bg-blue-400 border-none'
          : '';

  return (
    <li
      key={ques?.QuestionID}
      className={`flex items-center justify-between text-[1.3rem] `}
    >
      <button
        ref={ref}
        onClick={() => handleNavigation(index)}
        className={`h-[3rem] w-[3rem] rounded-full font-[600] hover:bg-gray-50/10 ${
          questionOrder === index ? 'border-2 border-white' : ''
        }`}
      >
        {index + 1}
      </button>
      <TbNotes
        size={20}
        color={isNoted || (note?.bookmarkStatus === 'Y' && note?.description) ? 'blue' : 'gray'}
        title={isNoted ? 'Noted' : 'Note'}
      />
      <FaRegBookmark
        size={20}
        color={isBookmarked || (note?.bookmarkStatus === 'Y' && note?.description) ? 'orange' : 'gray'}
        title={isBookmarked ? 'Bookmarked' : 'Bookmark'}
      />
      <div
        className={`h-[1.2rem] w-[1.2rem] rounded-full border-2 border-white ${style}`}
      ></div>
    </li>
  );
};

export default QuizNavigate;
