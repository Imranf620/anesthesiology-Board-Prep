import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/UI/Button";
import { useCreateTest } from "./useCreateTest";
import { useQuizContext } from "../../context/QuizContext";
import { toast } from "react-toastify";
import { useGetResults } from "../Dashboard/useGetResults";
import { useGetProfile } from "../Authentication/useGetProfile";

const TEST_TYPES = ["timed", "untimed", "tutor"];

const CreateQuickTestForm = ({ onCloseSidebar, formClasses, quickTest }) => {
  const [testType, setTestType] = useState("");
  const [checkedOptions, setCheckedOptions] = useState({
    New: false,
    Correct: false,
    Incorrect: false,
    Marked: false,
  });
  const [error, setError] = useState(null);
  const [defaultName, setDefaultName] = useState(null);
  const testNameRef = useRef();
  const numOfQuestionsRef = useRef();
  const { createTest, isLoading } = useCreateTest();
  const { setQuiz } = useQuizContext();
  const navigate = useNavigate();
  const { results } = useGetResults();
  const { profile } = useGetProfile();

  // Handle Checked options
  const handleCheckbox = (e) => {
    setError(null);
    const { name, checked } = e.target;
    setCheckedOptions({ ...checkedOptions, [name]: checked });
  };

  // Handle form submittion (create test/quiz)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Take out the selected keywords ['New','Correct','Incorrect']
    const questionType = Object.keys(checkedOptions).filter(
      (typ) => checkedOptions[typ]
    );

    // If no question type is selected return error
    if (!questionType.length) {
      return setError("Please select Question Type");
    }

    // If no test type is selected return error
    if (!testType) {
      return setError("Please select Test Type");
    }

    // Data to create a quiz/test
    const data = {
      username: localStorage.getItem("username"),
      testName: testNameRef.current.value,
      testType: testType.toUpperCase(),
      questionsCount: +numOfQuestionsRef.current.value,
      questionStateList: questionType,
    };

    // Create test/quiz function
    createTest(data, {
      onSuccess: (data) => {
        onCloseSidebar?.();
        toast.success(
          "Test created successfully, you will be redirected in a second!",
          { autoClose: 2000 }
        );
        setTimeout(() => {
          navigate(
            `/take-quiz?questionOrder=0&questionId=${data.data.questions[0].QuestionID}`
          );
        }, 2000);
        data.data.status === "in progress";
        data.data.new = true;
        setQuiz(data.data);
      },
      onError: (err) => {
        toast.error(err.message, { autoClose: false });
      },
    });
  };

  // handler function to set the test type
  const handleTestType = (typ) => {
    setTestType(typ);
  };

  useEffect(() => {
    if (!profile || !results) return;
    const date = new Date();
    const defaultTestName = `T${String(results?.length + 1).padStart(
      2,
      0
    )}-${profile?.Name.split(" ").join("-")}-${date.toLocaleDateString(
      "en-US"
    )}`;
    setDefaultName(defaultTestName);
  }, [results, profile, setDefaultName]);

  // Styles
  const labelClasses = "font-[500] text-xl";
  const inputClasses = `outline-none py-2 px-3 rounded-md border-2  text-black ${
    quickTest
      ? "focus:border-primary-200 border-transparent"
      : "focus:border-gray-500 border-gray-200"
  }`;

  // Checkbox classes
  const inputCheckboxClasses =
    "h-5 w-5 text-primary-300 transition duration-150 ease-in-out cursor-pointer accent-primary-300";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        formClasses
          ? formClasses
          : "flex flex-col gap-7 h-[70%] w-full px-4 overflow-y-auto scrollbar pb-6"
      }
    >
      {/* Test Name */}
      <div className="flex flex-col gap-2">
        <label className={labelClasses}>Test Name</label>
        <input
          ref={testNameRef}
          defaultValue={defaultName}
          type="text"
          required
          className={inputClasses}
        />
      </div>
      {/* Test type */}
      <div className="flex flex-col gap-2">
        <label className={labelClasses}>Test Type</label>
        <ul className="flex  text-black rounded-md overflow-hidden text-[0.9rem]">
          {TEST_TYPES.map((typ) => (
            <li
              key={typ}
              onClick={() => handleTestType(typ)}
              className={`py-2 px-3 flex-1 capitalize text-center  cursor-pointer ${
                typ === testType
                  ? "bg-primary-400 text-white"
                  : ` hover:bg-gray-200 ${
                      quickTest ? "bg-white" : "bg-gray-100"
                    }`
              }`}
            >
              {typ}
            </li>
          ))}
        </ul>
      </div>

      {/* Number of Questons */}
      <div className="flex flex-col gap-2">
        <label className={labelClasses}>Number of Questions</label>
        <input
          ref={numOfQuestionsRef}
          onFocus={(e) =>
            e.target.addEventListener(
              "wheel",
              function (e) {
                e.preventDefault();
              },
              { passive: false }
            )
          }
          type="number"
          required
          min={1}
          className={inputClasses}
        />
      </div>

      {/* Question type */}
      <div className="flex flex-col gap-4">
        <label className={labelClasses}>Question Type</label>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              name="New"
              type="checkbox"
              onChange={handleCheckbox}
              checked={checkedOptions.New}
              className={inputCheckboxClasses}
            />
            <label>New</label>
          </div>
          <div className="flex gap-2">
            <input
              name="Correct"
              type="checkbox"
              onChange={handleCheckbox}
              checked={checkedOptions.Correct}
              className={inputCheckboxClasses}
            />
            <label>Correct</label>
          </div>
          <div className="flex gap-2">
            <input
              name="Incorrect"
              type="checkbox"
              onChange={handleCheckbox}
              checked={checkedOptions.Incorrect}
              className={inputCheckboxClasses}
            />
            <label>Incorrect</label>
          </div>
          <div className="flex gap-2">
            <input
              name="Marked"
              type="checkbox"
              onChange={handleCheckbox}
              checked={checkedOptions.Marked}
              className={inputCheckboxClasses}
            />
            <label>Marked</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {error && (
          <span className="text-red-500/90 text-[0.8rem] text-center">
            {error}
          </span>
        )}
        <Button
          className={
            quickTest
              ? "border-2 border-white rounded-3xl hover:border-white py-2 hover:bg-gray-100/10"
              : ""
          }
          variant={quickTest ? "outline" : "dark"}
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateQuickTestForm;
