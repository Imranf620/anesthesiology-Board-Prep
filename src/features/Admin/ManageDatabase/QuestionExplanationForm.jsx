import { useState } from 'react';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import QuestionVideo from './QuestionVideo';

const QuestionExplanationForm = ({
  setQuestionExplanation,
  handleSubmit,
  register,
  onSubmit2,
  errors,
  isLoading,
  edit,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit2)}
      className="mx-auto flex w-[98%] max-w-[800px] flex-col gap-6 rounded-lg bg-white px-4  py-10 md:w-[90%]"
    >
      <h2 className="text-center text-[1.5rem] font-[500]">
        Explanation why the answers are correct or incorrect
      </h2>
      {/* Answer A Explanation */}
      <Input
        autoFocus
        disabled={isLoading}
        textArea={true}
        id="explanationA"
        required="This field is required"
        label="Answer A Explanation"
        register={register}
        className="resize-none"
        rows="6"
        error={errors.explanationA && errors.explanationA.message}
      />
      {/* Answer B Explanation */}

      <Input
        disabled={isLoading}
        textArea={true}
        id="explanationB"
        required="This field is required"
        label="Answer B Explanation"
        register={register}
        className="resize-none"
        rows="6"
        error={errors.explanationB && errors.explanationB.message}
      />
      {/* Answer C Explanation */}

      <Input
        disabled={isLoading}
        textArea={true}
        id="explanationC"
        required="This field is required"
        label="Answer C Explanation"
        register={register}
        className="resize-none"
        rows="6"
        error={errors.explanationC && errors.explanationC.message}
      />
      {/* Answer D Explanation */}

      <Input
        disabled={isLoading}
        textArea={true}
        id="explanationD"
        required="This field is required"
        label="Answer D Explanation"
        register={register}
        className="resize-none"
        rows="6"
        error={errors.explanationD && errors.explanationD.message}
      />

      {/* Button Line summary */}
      <div>
        <Input
          disabled={isLoading}
          id="summary"
          required="This field is required"
          label="Bottom Line Summary"
          register={register}
          error={errors.summary && errors.summary.message}
        />
      </div>
      {/* reference */}

      <div>
        <Input
          disabled={isLoading}
          id="reference"
          required="This field is required"
          label="Reference"
          register={register}
          error={errors.reference && errors.reference.message}
          textArea={true}
          rows="6"
          className="resize-none"
        />
      </div>
      {/* Video btn */}
      <label className="text-[1rem] font-[600] sm:text-[1rem] md:text-[1.2rem]">
        Video Explanation
      </label>
      <QuestionVideo />
      <div>
        <Button
          disabled={isLoading}
          variant="dark"
          onClick={() => setQuestionExplanation(false)}
        >
          Prev
        </Button>
      </div>
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        variant="dark"
        type="submit"
      >
        {edit ? 'Update' : 'Add'} Question
      </Button>
    </form>
  );
};

export default QuestionExplanationForm;
