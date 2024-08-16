import { createContext, useContext, useEffect, useReducer } from 'react';
import CryptoJS from 'crypto-js';

const QuizContext = createContext();

const initialState = {
  quiz: null,
  questions: [],
  quizName: '',
  options: [],
  status: '',
  testType: '',
  testTime: '',
};

// Function to set Options
const setOptions = (state, action) => {
  let newOptions;

  // Check if the questionId already exists in the options
  const isQuestionExists = state.options.find(
    opt => opt.questionId === action.payload.questionId,
  );
  // If questionId exists and the options are the same
  if (isQuestionExists && isQuestionExists.option === action.payload.option)
    return (newOptions = [...state.options]);

  // If questionId exists and the option is different this time
  if (isQuestionExists && isQuestionExists.option !== action.payload.option) {
    const option = state.options.find(
      opt => opt.questionId === action.payload.questionId,
    );
    const filterOptions = state.options.filter(
      opt => opt.questionId !== action.payload.questionId,
    );
    option.option = action.payload.option;
    newOptions = [...filterOptions, option];
  }

  // If the option is selected for the first time for the question
  if (!isQuestionExists) {
    newOptions = [
      ...state.options,
      {
        option: action.payload.option,
        questionId: action.payload.questionId,
        correct: action.payload.correct,
        markStatus: 'N',
      },
    ];
  }

  return newOptions;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STATE': {
      return {
        ...action.payload,
      };
    }
    // Set All the quiz data
    case 'SET_QUIZ_DATA': {
      let options = [];
      if (!action.payload.new) {
        const optionsFilter = action.payload.questions.map(ques => {
          if (ques.Choice === 'U') {
            ques.Choice = undefined;
            return ques;
          } else {
            return ques;
          }
        });
        options = optionsFilter.map(ques => {
          return {
            option: ques.Choice,
            correct: ques.Correct,
            questionId: ques.QuestionID,
            submitted: ques.Choice,
          };
        });
      }

      if (action.payload.new) {
        options = action.payload.questions.map(ques => {
          return {
            questionId: ques.QuestionID,
            correct: ques.Correct.trim(),
          };
        });
      }

      return {
        ...state,
        quiz: action.payload,
        questions: action.payload.questions,
        quizName: action.payload.test_name,
        status: action.payload.status,
        testType: action.payload.test_type,
        testTime: action.payload.test_time,
        options,
      };
    }

    // Set the option
    case 'SET_OPTIONS': {
      const newOptions = setOptions(state, action);
      return {
        ...state,
        options: newOptions,
      };
    }

    // Mark Question
    case 'MARK_QUESTION': {
      const options = [...state.options];

      const opt = options.find(
        op => op.questionId === action.payload.questionId,
      );

      if (opt) {
        opt.markStatus = action.payload.mark;
        const filterOptions = options.filter(
          op => op.questionId !== opt.questionId,
        );
        return {
          ...state,
          options: [...filterOptions, opt],
        };
      } else {
        const option = {
          questionId: action.payload.questionId,
          markStatus: action.payload.mark,
        };

        return {
          ...state,
          options: [...state.options, option],
          correct: action.payload.correct,
          option: '',
        };
      }
    }

    // Set if an option is submitted
    case 'SET_OPTION_SUBMITTED': {
      // Check if the option is already selected
      const questionOption = state.options.find(
        opt => opt.questionId === action.payload,
      );

      // If the question option is not selected
      if (!questionOption) {
        return {
          ...state,
          options: [
            ...state.options,
            { questionId: action.payload, submitted: true },
          ],
        };
      }

      // If Option is already selected for the question simply set submitted to true
      questionOption.submitted = true;

      // Filter out all the existing options except for the updated one
      const options = state.options.filter(
        opt => opt.questionId !== questionOption.questionId,
      );

      // Set all new options
      const newOptions = [...options, questionOption];
      return {
        ...state,
        options: newOptions,
      };
    }

    // Set timer
    case 'SET_TIME': {
      return {
        ...state,
        testTime: action.payload.time,
      };
    }

    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
};

const QuizContexProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setState = data => dispatch({ type: 'SET_STATE', payload: data });

  // Set the quiz data
  const setQuiz = data => {
    dispatch({ type: 'SET_QUIZ_DATA', payload: data });
  };

  // Set the options chossed by the user
  const setOptions = optObj =>
    dispatch({ type: 'SET_OPTIONS', payload: optObj });

  // Set the explanation
  const setOptionSubmitted = questionId =>
    dispatch({ type: 'SET_OPTION_SUBMITTED', payload: questionId });

  // Mark question function
  const markQuestion = (questionId, mark, correct) =>
    dispatch({ type: 'MARK_QUESTION', payload: { questionId, mark, correct } });

  // Set Time function
  const setTime = time => dispatch({ type: 'SET_TIME', payload: { time } });

  // Reset the state
  const clearQuizState = () => dispatch({ type: 'RESET' });

  useEffect(() => {
    const isState = localStorage.getItem('state');
    if (isState) {
      const bytes = CryptoJS.AES.decrypt(
        isState,
        import.meta.env.VITE_SECRET_KEY,
      );
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      setState(decryptedData);
    }
  }, []);

  return (
    <QuizContext.Provider
      value={{
        setQuiz,
        state,
        setOptions,
        setOptionSubmitted,
        setState,
        clearQuizState,
        markQuestion,
        setTime,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw Error('Quiz context is used outside the provider');

  return context;
};

export { QuizContexProvider, useQuizContext };
