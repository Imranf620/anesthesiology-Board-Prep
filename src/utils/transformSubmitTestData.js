export const transformSubmitTestData = (data) => {
  const questionChoices = data.questionChoices.map((choice) => {
    return {
      QuestionID: choice.questionId,
      Correct: choice.correct,
      Choice: choice.option ? choice.option : "U",
      MarkStatus: choice.markStatus || "N",
    };
  });
  return {
    username: data.username,
    userTestID: data.userTestID,
    questionChoices,
  };
};
