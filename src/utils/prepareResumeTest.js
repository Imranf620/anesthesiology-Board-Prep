export const prepareResumeTest = (data, status, quesId) => {
  data.status = status.toLowerCase();
  data.new = false;

  // Sort questions on the basis of question id's
  data.questions.sort((a, b) => a.QuestionID - b.QuestionID);

  // Set quiz data
  let indexOfLastSelect,
    questionId = quesId;

  // pull out all the option which are selected
  const choiceSelectQues = data.questions.filter(
    itm => itm.Choice.toLowerCase() !== 'u',
  );

  // If status is not completed pull out the index of last option and questionId to navigate to it
  if (questionId) {
    indexOfLastSelect = data.questions.findIndex(
      itm => itm.QuestionID === questionId,
    );
  } else if (
    status.toLowerCase() !== 'completed' &&
    choiceSelectQues?.length > 0 &&
    !questionId
  ) {
    questionId = choiceSelectQues.at(-1).QuestionID;
    indexOfLastSelect = data.questions.findIndex(
      itm => itm.QuestionID === questionId,
    );
  } else {
    questionId = data.questions[0].QuestionID;
  }

  // Set url value
  const url =
    status.toLowerCase() === 'completed'
      ? `/quiz-result?questionOrder=${indexOfLastSelect ? indexOfLastSelect : '0'}&questionId=${questionId}`
      : `/take-quiz?questionOrder=${indexOfLastSelect ? indexOfLastSelect : '0'}&questionId=${questionId}`;

  return { data, url };
};
