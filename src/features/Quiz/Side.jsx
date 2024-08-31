import React from 'react'
import Calculator from "./Calculator"
import QuestionNote from "./QuestionNote.jsx"
import Feedback from "./Feedback.jsx"

const Side = ({ side, questionID, userTestID , Topic}) => {
  // Side
  
  return (
    <div className='w-full h-full'>
      {side === "cal" ? (
        <Calculator />
      ) : side === "notes" ? (
        <QuestionNote questionID={questionID} Topic={Topic} userTestID={userTestID} />
      ) : (
        <Feedback />
      )}
    </div>
  );
};
export default Side