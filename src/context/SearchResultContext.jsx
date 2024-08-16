import { createContext, useContext, useEffect, useReducer } from 'react';
import { useGetAllQuestions } from '../features/QuestionSearch/useGetAllQuestions';

const SearchResultContext = createContext({});

const initialState = {
  searchResults: [],
  selectedData: [],
  selectedDataIds: [],
  filteredData: [],
  filterExact: false,
};

const filterData = (keyword, searchResults, category) => {
  const regExp = new RegExp(keyword, 'i');
  return searchResults.filter(item => {
    if (category === 'All') {
      return (
        regExp.test(item.Chapter) ||
        regExp.test(item.Statement) ||
        regExp.test(item.Topic)
      );
    } else if (category === 'Question stem') {
      return regExp.test(item.Statement);
    } else if (category === 'Topic') {
      return regExp.test(item.Topic);
    } else if (category === 'Chapter') {
      return regExp.test(item.Chapter);
    }
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    // Set Search result
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload,
        dataLength: action.payload?.length,
      };

    // Set the selected Data
    case 'SET_SELECTED_DATA':
      return {
        ...state,
        selectedData: [...state.selectedData, action.payload],
        selectedDataIds: [...state.selectedDataIds, action.payload.id],
      };

    //  Remove selected Data
    case 'REMOVE_SELECTED_DATA': {
      const newSelectedData = state.selectedData.filter(
        data => data.id !== action.payload,
      );
      const newSelectedIds = state.selectedDataIds.filter(
        slecId => slecId !== action.payload,
      );
      return {
        ...state,
        selectedData: newSelectedData,
        selectedDataIds: newSelectedIds,
      };
    }

    //  Filter the data
    case 'FILTER_DATA': {
      let exact = action.payload.exact;
      const category = action.payload.category;
      const keyword = action.payload.keyword;

      let result;
      if (keyword) {
        // If it is exact search
        if (exact) {
          if (category === 'All') {
            result = filterData(keyword, state.searchResults, 'All');
          } else {
            result = state.searchResults.filter(itm => {
              if (category === 'Question stem') {
                return itm.Statement.toLowerCase() === keyword.toLowerCase();
              } else if (category === 'Topic') {
                return itm.Topic.toLowerCase() === keyword.toLowerCase();
              } else if (category === 'Chapter') {
                return itm.Chapter.toLowerCase() === keyword.toLowerCase();
              }
            });
          }
        } else {
          result = filterData(keyword, state.searchResults, category);
        }
      }
      if (!keyword) {
        result = [...state.searchResults];
      }
      return {
        ...state,
        filteredData: result,
        filterExact: exact,
      };
    }

    // Reset filter data
    case 'RESET_FILTER_STATE': {
      return {
        ...state,
        filteredData: [],
      };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
};

const SearchResultContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { allQuestions, isLoading } = useGetAllQuestions();
  // Set the Data
  const setData = data => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: data });
  };

  // Set the seletected Data
  const setSelectedData = data => {
    dispatch({ type: 'SET_SELECTED_DATA', payload: data });
  };

  // Remove the selected data
  const removeSelectedData = id => {
    dispatch({ type: 'REMOVE_SELECTED_DATA', payload: id });
  };

  // Fitler data
  const filterData = (keyword, category, exact = false) => {
    dispatch({ type: 'FILTER_DATA', payload: { keyword, category, exact } });
  };

  // Reset Filter State
  const resetFilterState = () => {
    dispatch({ type: 'RESET_FILTER_STATE' });
  };

  // Reset the state
  const clearSearchState = () => {
    dispatch({ type: 'RESET' });
  };

  // Get the questions
  useEffect(() => {
    if (allQuestions && !isLoading) {
      setData(allQuestions.questions);
    }
  }, [allQuestions, isLoading]);

  return (
    <SearchResultContext.Provider
      value={{
        setData,
        setSelectedData,
        removeSelectedData,
        state,
        filterData,
        resetFilterState,
        clearSearchState,
        isQuestionsLoading: isLoading,
      }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};

const useSearchResultContext = () => {
  const context = useContext(SearchResultContext);
  if (context === undefined)
    throw Error('Search Result context is used outside the provider');

  return context;
};

export { SearchResultContextProvider, useSearchResultContext };
