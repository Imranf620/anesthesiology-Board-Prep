import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";

const QuestionInfoForm = ({
  handleSubmit,
  onSubmit1,
  register,
  errors,
  isLoading,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit1)}
      className="mx-auto flex w-[98%] max-w-[800px] flex-col gap-6 rounded-lg bg-white px-6  py-10 shadow-xl md:w-[90%]"
    >
      <div>
        <h2 className="mb-10 text-center text-[1.5rem] font-[500]">
          Question Information
        </h2>
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2">
          {/* Topic name */}
          <Input
            autoFocus
            label="Topic Name"
            type="text"
            id="topic"
            register={register}
            required="Topic Name is required!"
            disabled={isLoading}
            error={errors.topic && errors.topic.message}
            className="w-full"
          />
          {/* Chapter Name */}
          <Input
            label="Chapter Name"
            type="text"
            id="chapter"
            register={register}
            required="Chapter Name is required!"
            disabled={isLoading}
            error={errors.chapter && errors.chapter.message}
          />
        </div>
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2">
          {/* Keywords */}
          <Input
            label="Keywords"
            type="text"
            id="keywords"
            register={register}
            required="Keywords are required!"
            disabled={isLoading}
            error={errors.keywords && errors.keywords.message}
            className="w-full"
          />
          {/* Publication ID */}
          <Input
            label="Publication ID"
            type="number"
            id="pumbedid"
            register={register}
            disabled={isLoading}
            error={errors.pumbedid && errors.pumbedid.message}
            min={0}
            className="w-full"
          />
        </div>
        {/* Question Text */}
        <Input
          label="Question Text"
          type="text"
          id="question"
          register={register}
          required="Question is required!"
          disabled={isLoading}
          error={errors.question && errors.question.message}
          textArea
          rows="6"
          className="resize-none"
        />

        {/* Answer A */}
        <Input
          label="Answer A"
          type="text"
          id="answerA"
          register={register}
          required="Answer A is required!"
          disabled={isLoading}
          error={errors.answerA && errors.answerA.message}
          textArea
          rows="6"
          className="resize-none"
        />
        {/* Answer B */}
        <Input
          label="Answer B"
          type="text"
          id="answerB"
          register={register}
          required="Answer B is required!"
          disabled={isLoading}
          error={errors.answerB && errors.answerB.message}
          textArea
          rows="6"
          className="resize-none"
        />
        {/* Answer C */}
        <Input
          label="Answer C"
          type="text"
          id="answerC"
          register={register}
          required="Answer C is required!"
          disabled={isLoading}
          error={errors.answerC && errors.answerC.message}
          textArea
          rows="6"
          className="resize-none"
        />
        {/* Answer D */}
        <Input
          label="Answer D"
          type="text"
          id="answerD"
          register={register}
          required="Answer D is required!"
          disabled={isLoading}
          error={errors.answerD && errors.answerD.message}
          textArea
          rows="6"
          className="resize-none"
        />
        {/* Select correct Answer */}
        <div className="grid grid-cols-1  gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[1.2rem] font-[600]">Correct Answer</label>
            <select
              id="correctAnswer"
              {...register("correctAnswer", {
                required: "correct Answer is required",
              })}
              className="rounded-md border-2 border-gray-300 px-3 py-2 text-[1.3rem] font-[500] outline-none focus:border-primary-400"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>
      </div>

      {/* Next form button */}
      <div className="flex justify-end">
        <Button disabled={isLoading} type="submit" variant="dark">
          Next
        </Button>
      </div>
    </form>
  );
};

export default QuestionInfoForm;
