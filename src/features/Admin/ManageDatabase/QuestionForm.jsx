import { useState } from 'react';
import { useForm } from 'react-hook-form';

import QuestionInfoForm from './QuestionInfoForm';
import QuestionExplanationForm from './QuestionExplanationForm';
import { useAddQuestion } from './useAddQuestion';

import { toast } from 'react-toastify';
import { transformQuestionData } from '../../../utils/transformQuestionData';

const QuestionForm = ({ question, edit = false }) => {
  const { addQuestion, isLoading } = useAddQuestion();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: edit
      ? {
          // If edit is true add default values to all the inputs
          topic: question?.Topic,
          chapter: question?.Chapter,
          keywords: question?.Keywords,
          pubmedid: question?.PublicationId,
          question: question?.Statement,
          answerA: question?.choices?.find(choic => choic.OptionName === 'A')
            ?.OptionStatement,
          answerB: question?.choices?.find(choic => choic.OptionName === 'B')
            ?.OptionStatement,
          answerC: question?.choices?.find(choic => choic.OptionName === 'C')
            ?.OptionStatement,
          answerD: question?.choices?.find(choic => choic.OptionName === 'D')
            ?.OptionStatement,
          correctAnswer: question?.Correct,
          explanationA: question?.choices?.find(
            choic => choic.OptionName === 'A',
          )?.Reason,
          explanationB: question?.choices?.find(
            choic => choic.OptionName === 'B',
          )?.Reason,
          explanationC: question?.choices?.find(
            choic => choic.OptionName === 'C',
          )?.Reason,
          explanationD: question?.choices?.find(
            choic => choic.OptionName === 'D',
          )?.Reason,
          summary: question?.Summary,
          reference: question?.References,
        }
      : {},
  });
  const [questionExplanation, setQuestionExplanation] = useState(false);

  // To navigate to next form if true and no error
  const onSubmit1 = data => {
    if (Object.keys(errors).length === 0) {
      setQuestionExplanation(true);
    }
  };

  // Submit the data
  const onSubmit2 = questionData => {
    if (!edit) {
      const question = transformQuestionData(questionData);
      const data = {
        username: localStorage.getItem('username'),
        question,
      };
      addQuestion(data, {
        onSuccess: () => {
          reset();
          setQuestionExplanation(false);
          toast.success('Question successfully Added to Database!', {
            autoClose: 4000,
          });
        },
        onError: err => {
          toast.error(err.message, { autoClose: 7000 });
        },
      });
    } else {
      console.log('question edit');
    }
  };

  return questionExplanation ? (
    // Question explanation Form
    <QuestionExplanationForm
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      register={register}
      onSubmit2={onSubmit2}
      setQuestionExplanation={setQuestionExplanation}
      errors={errors}
      edit={edit}
    />
  ) : (
    // Question Info Form
    <QuestionInfoForm
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      onSubmit1={onSubmit1}
      register={register}
      errors={errors}
    />
  );
};

export default QuestionForm;
