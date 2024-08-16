export const transformQuestionData = (data) => {
  return {
    "Advanced or Basic Topic and Chapter": `${data.topic}. ${data.chapter}`,
    Keywords: data.keywords,
    "Question Text": data.question,
    "Answer A": data.answerA,
    "Answer B": data.answerB,
    "Answer C": data.answerC,
    "Answer D": data.answerD,
    "Correct Answer (letter only)": data.correctAnswer,
    "Answer A ~ Explanation on why answer is correct or incorrect":
      data.explanationA,
    "Answer B ~ Explanation on why answer is correct or incorrect":
      data.explanationB,
    "Answer C ~ Explanation on why answer is correct or incorrect":
      data.explanationC,
    "Answer D ~ Explanation on why answer is correct or incorrect":
      data.explanationD,
    "Bottom Line Summary": data.summary,
    "Pubmed ID for each citation": data.pumbedid,
    "Reference(s)": data.reference,
    "Contributor Initials": "TEST",
  };
};
