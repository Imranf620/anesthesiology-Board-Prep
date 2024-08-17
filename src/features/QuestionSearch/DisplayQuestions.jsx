import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchResultContext } from '../../context/SearchResultContext';
import QuestionsResultFilter from './QuestionsResultFilter';
import Table from '../../components/UI/Table';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import DisplayQuestionsItem from './DisplayQuestionsItem';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Button from '../../components/UI/Button';

const DisplayQuestions = ({ admin }) => {
  const {
    state,
    setSelectedData,
    removeSelectedData,
    isQuestionsLoading: isLoading,
  } = useSearchResultContext();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const totalResults = state.searchResults.length;
  const [resultData, setResultData] = useState([]);

  const [checkedOptions, setCheckedOptions] = useState(() =>
    admin
      ? {
          topic: true,
          chapter: true,
          statement: true,
          status: true,
          edit: true,
        }
      : {
          topic: true,
          chapter: true,
          Keywords: true,
          Questions: true,
        },
  );

  // Take out the type either 'all question' or 'selected'
  const questionsType = searchParams.get('questions');
  const status = searchParams.get('status');
  const [statusValue, setStatusValue] = useState('');

  useEffect(() => {
    if (status) {
      const statuses = status.split(',');
      let isActive = [];

      // Determine the active statuses based on query parameters
      if (statuses.includes('active') && statuses.includes('inactive')) {
        // Show all statuses (no filter)
        isActive = [];
      } else if (statuses.includes('active')) {
        // Show only active
        isActive = ['Y'];
      } else if (statuses.includes('inactive')) {
        // Show only inactive
        isActive = ['N'];
      }

  
      // Filter the data based on the determined statuses
      const filteredData = isActive.length > 0
        ? state.searchResults.filter(data => {
      
            return isActive.includes(data.isActive);
          })
        : state.searchResults;

      setResultData(filteredData);
    } else {
      // No status filter applied, show all results
      setResultData(state.searchResults);
    }
    
    // Ensure the resultData is logged correctly

  }, [status, state.searchResults]);

  // Num of pages
  let numOfPages;
  if (questionsType === 'allQuestions' || questionsType === undefined) {
    if (state.filteredData?.length > 0) {
      numOfPages = Math.ceil(state.filteredData.length / 10);
    } else {
      numOfPages = Math.ceil(resultData.length / 10);
    }
  } else if (questionsType === 'selected') {
    numOfPages = Math.ceil(state.selectedData.length / 10);
  }

  // Data to be displayed in the table
  // Slice the data from the array according to the page
  const dataSlice = currentPage - 1;
  let data;
  if (questionsType === 'selected') {
    data = state.selectedData.slice(dataSlice * 10, currentPage * 10);
  } else if (state.filteredData.length > 0) {
    data = state.filteredData.slice(dataSlice * 10, currentPage * 10);
  } else if (state.filteredData.length === 0 && state.filterExact) {
    data = [];
  } else {
    data = resultData.slice(dataSlice * 10, currentPage * 10);
  }

  // Function to handle rows of the table
  const handleCheckboxChange = event => {
    const { id, checked } = event.target;
    setCheckedOptions({ ...checkedOptions, [id]: checked });
  };

  // Function to add or remove the questions
  const handleSelectQuestion = (event, question) => {
    if (event.target.checked) {
      setSelectedData(question);
    } else {
      removeSelectedData(question.id);
    }
  };

  // Function to handle pages
  const handlePages = next => {
    if (!next) {
      if (currentPage === 1) return;
      setCurrentPage(prev => prev - 1);
    } else {
      if (currentPage === numOfPages) return;
      setCurrentPage(prev => prev + 1);
    }
  };

  // Table Headers
  const headers = Object.keys(checkedOptions).filter(
    opt => checkedOptions[opt] === true,
  );

  // Reset current page to one when changing between all questions and selected
  useEffect(() => {
    setCurrentPage(1);
  }, [questionsType, state.filteredData]);

  // If the data is not arrived, refetch
  useEffect(() => {
    if (state.searchResults.length === 0) {
      queryClient.fetchQuery({ queryKey: ['all-questions'] });
    }
  }, [state.searchResults, queryClient]);

  return (
    <section className="bg-white px-3 pb-10">
      {/* Result Filter */}
      <QuestionsResultFilter
        checkedOptions={checkedOptions}
        onCheckboxChange={handleCheckboxChange}
        admin={admin}
      />

      {/* Data Table */}
      <div className="mx-auto max-h-[80dvh] w-full min-w-[300px] overflow-hidden rounded-lg border-2 border-gray-400">
        <div className="max-h-[70dvh] w-full overflow-auto">
          <Table className="w-full border-collapse overflow-auto">
            <Table.Head>
              <Table.Row className="sticky top-0 z-0 bg-gray-200">
                <th className="px-3 py-2 text-start capitalize">
                  Serial Number
                </th>
                {headers.map(header => (
                  <th className="px-3 py-2 text-start capitalize" key={header}>
                    {header}
                  </th>
                ))}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {data.length > 0 &&
                data.map(dta => (
                  <Table.Row key={dta?.id}>
                    <Table.Data>
                      <div className="flex items-center gap-2">
                        <DisplayQuestionsItem
                          question={dta}
                          handleSelectQuestion={handleSelectQuestion}
                        />
                        {dta.id}
                      </div>
                    </Table.Data>
                    {checkedOptions.topic && (
                      <Table.Data>{dta?.Topic}</Table.Data>
                    )}
                    {checkedOptions.chapter && (
                      <Table.Data>{dta?.Chapter}</Table.Data>
                    )}
                    {checkedOptions.Keywords && (
                      <Table.Data>{dta?.Keywords}</Table.Data>
                    )}
                    {(checkedOptions.Questions || checkedOptions.statement) && (
                      <Table.Data
                        className={`${
                          dta?.Statement?.length > 60 ? 'text-[0.8rem]' : ''
                        }`}
                      >
                        {dta?.Statement}
                      </Table.Data>
                    )}
                    {admin && checkedOptions.status && (
                      <Table.Data>
                        {dta.isActive === 'Y' ? 'Active' : 'Not Active'}
                      </Table.Data>
                    )}
                    {admin && checkedOptions.edit && (
                      <Table.Data>
                        <Button
                          variant="underline"
                          className="px-5 hover:shadow-lg"
                          link
                          to={`edit-question/${dta.id}`}
                        >
                          Edit{' '}
                        </Button>
                      </Table.Data>
                    )}
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        {/* When no results were found */}
        {data.length === 0 && !isLoading && (
          <div className="my-16 flex justify-center">No result found!</div>
        )}

        {isLoading && (
          <div className="my-16 flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {/* Pagination */}
        <div className="sticky bottom-0 flex flex-wrap  items-center justify-between bg-gray-200 px-3 py-2">
          <button
            onClick={() => handlePages(false)}
            disabled={!totalResults || currentPage === 1}
            className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 font-[500] opacity-80 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <HiArrowLeft />
            <span>Prev</span>
          </button>
          {/* Current page */}
          <span className="font-[500] text-gray-500">
            Pages:{' '}
            {!totalResults || (!state.filteredData.length && state.filterExact)
              ? '0'
              : currentPage}{' '}
            / {numOfPages}
          </span>
          <button
            disabled={!totalResults || currentPage === numOfPages}
            onClick={() => handlePages(true)}
            className="flex cursor-pointer  items-center gap-3 rounded-md px-3 py-2 font-[500] opacity-80 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>Next</span> <HiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DisplayQuestions;
