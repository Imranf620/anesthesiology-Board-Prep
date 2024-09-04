import { useSearchParams } from 'react-router-dom';
import Heading from '../../components/UI/Heading';
import { useQuizContext } from '../../context/QuizContext';
import { HiX } from 'react-icons/hi';
import Modal from '../../components/UI/Modal';
import VideoExplanation from './VideoExplanation';
import QuizNotes from './QuizNotes';
import { FaXmark } from 'react-icons/fa6';
import { useState } from 'react';
import ReviewModal from './ReviewModal'; // Import the new modal component
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const QuestionExplanation = ({ setShowExplanation }) => {
  const [searchParams] = useSearchParams();
  const { state } = useQuizContext();
  const [showRes, setShowRes] = useState(true);
  const questionId = +searchParams.get('questionId');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewType, setReviewType] = useState('');

  // Take out the question
  const question = state.questions.find(ques => ques.QuestionID === questionId);

  // Take out the correct option
  const correctOpt =
    question.Correct.length > 0
      ? question.Correct.split('or').map(itm => itm.trim())
      : question.Correct;

  // Take out the choices
  const choices = question.choices;

  let i = 0;
  const findCorrect = () => {
    state.options.forEach(opt => {
      if (opt.submitted === opt.correct) {
        i++;
      }
    });
    return i;
  };

  const totalCorrect = findCorrect();
  const totalQuestions = state.questions.length;
  const totalWrong = totalQuestions - totalCorrect;
  const correctPercentage = (totalCorrect / totalQuestions) * 100;
  const wrongperCentage = (totalWrong / totalQuestions) * 100;
  const differenceInPercentage = correctPercentage - wrongperCentage;
  const totalTime = state.testTime;
  const nationalAverage = 67.5;

  const timeToSeconds = time => {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const secondsToTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const totalTimeInSeconds = timeToSeconds(totalTime);
  const averageTimeInSeconds = totalTimeInSeconds / totalQuestions;
  const averageTime = secondsToTime(averageTimeInSeconds);

  const selectedOpt = state.options.find(opt => opt.questionId === questionId);

  const handleReviewAll = () => {
    setReviewType('All Questions');
    setShowReviewModal(true);
    setShowRes(false);
  };

  const handleReviewIncorrect = () => {
    setReviewType('Incorrect Questions');
    setShowReviewModal(true);
    setShowRes(false);
  };

  return (
    <section className="relative mt-4 rounded-lg border-2 border-gray-500 bg-white p-5 shadow-md md:p-10">
      <div
        className="absolute right-[2.3rem] top-[1.5rem] cursor-pointer rounded-full p-2 text-[1.4rem] hover:bg-black/10"
        onClick={() => setShowExplanation(false)}
      >
        <HiX />
      </div>
      {showRes && (
        <div className="fixed overflow-y-auto pt-28 md:pt-10  inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="md:ml-20 mt-16 w-3/4 mx-auto md:mx-0 rounded-lg bg-white p-6 shadow-lg md:w-1/2 lg:w-1/2">
            <div className="mb-4  flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-800">
                Total Results
              </h1>
              <FaXmark
                size={24}
                className="cursor-pointer text-gray-600 transition hover:text-gray-800"
                onClick={() => setShowRes(false)}
              />
            </div>
            <div className="relative mb-6 flex h-32 items-center justify-center rounded-lg ">
              <div className=" absolute h-36 w-36">
                <CircularProgressbar
                  value={correctPercentage === 0 ? 0.1 :correctPercentage}
                  text={`${correctPercentage.toFixed(1)}%`}
                  styles={buildStyles({
                    textColor: '#000',
                    pathColor: '#3b82f6', // Blue color for correct percentage
                    trailColor: '#d6d6d6',
                    textSize: '1.2rem',
                    strokeWidth: 10, // Thicker stroke for outer circle
                  })}
                />
                <div className="absolute inset-0 left-1/2 top-1/2 flex h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <CircularProgressbar
                    value={nationalAverage}
                    styles={buildStyles({
                      pathColor: '#e63946', // Pink color for national average
                      trailColor: 'transparent', // Hide the trail of inner circle
                      strokeWidth: 5, // Thinner stroke for inner circle
                    })}
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center gap-6'>

            <div className="flex gap-3 items-center">
              <div className="h-3 w-3 rounded-full bg-[#e63946]"></div>
              <span className="text-nowrap">National Average</span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="h-3 w-3 rounded-full bg-[#3b82f6]"></div>
              <span className="text-nowrap">Your Score</span>
            </div>
            </div>
            <div className="space-y-4">
              <section className="flex justify-between">
                <h2 className="text-lg font-medium">
                  Score: {correctPercentage.toFixed(1)}%
                </h2>
                <h2 className="text-lg font-medium">
                  Questions: {totalQuestions}
                </h2>
              </section>
              <section className="flex justify-between">
                <h2 className="text-lg font-medium">
                  National Average: {nationalAverage}%
                </h2>
                <h2 className="text-lg font-medium">Correct: {totalCorrect}</h2>
              </section>
              <section className="flex justify-between">
                <h2 className="text-lg font-medium">
                  Difference:{' '}
                  <span
                    className={`font-semibold ${differenceInPercentage < 0 ? 'text-red-500' : 'text-gray-800'}`}
                  >
                    {differenceInPercentage.toFixed(1)}%
                  </span>
                </h2>
                <h2 className="text-lg font-medium">Incorrect: {totalWrong}</h2>
              </section>
              <section className="flex justify-between">
                <h2 className="text-lg font-medium">Total Time: {totalTime}</h2>
                <h2 className="text-lg font-medium">
                  Time per Question: {averageTime}
                </h2>
              </section>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
                onClick={handleReviewAll}
              >
                Review All
              </button>
              <button
                className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
                onClick={handleReviewIncorrect}
              >
                Review Incorrect
              </button>
            </div>
          </div>
        </div>
      )}

      <h4
        className={`w-fit rounded-md px-3 py-2 text-[1.2rem] font-[500] ${
          selectedOpt?.option === question.Correct
            ? 'bg-green-200'
            : 'bg-red-300'
        }`}
      >
        You Chossed: {selectedOpt?.option ? selectedOpt?.option : 'Nothing'}
      </h4>
      <div>
        <h3 className="text-[1.2rem] font-[500]">
          Correct: {question.Correct}
        </h3>
      </div>
      <Heading>Explanation</Heading>

      <ul className="flex flex-col gap-6">
        {choices.map((choice, i) => (
          <li key={i}>
            <h3
              className={`mb-1 w-fit rounded-md px-3 py-2 font-[600] ${
                correctOpt.includes(choice.OptionName)
                  ? 'bg-green-200'
                  : 'bg-red-300'
              }`}
            >
              Option: {choice.OptionName}
            </h3>
            <p>{choice.Reason}</p>
          </li>
        ))}
      </ul>

      <QuizNotes summary={question.Statement} question={question} />
      
      <div className="mt-8 flex flex-col gap-6">
        <Heading>Video Explanation</Heading>
        <Modal>
          <Modal.Open id="video-expl">
            <div className="h-[400px] w-full">
              <img
                src="/thumbnail.jpeg"
                className="h-full w-full cursor-pointer object-cover"
              />
            </div>
          </Modal.Open>
          <Modal.Window id="video-expl" closeOnOverlay>
            <VideoExplanation />
          </Modal.Window>
        </Modal>
      </div>
      {showReviewModal && (
        <ReviewModal
          onClose={() => setShowReviewModal(false)}
          title={reviewType}
        >
          <div>
            <p>Content for {reviewType}</p>
            {/* Add more content here based on the review type */}
          </div>
        </ReviewModal>
      )}
    </section>
  );
};

export default QuestionExplanation;
