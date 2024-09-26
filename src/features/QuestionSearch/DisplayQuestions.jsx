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
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const queryClient = useQueryClient();
  const totalResults = state.searchResults.length;
  const [checkedOptions, setCheckedOptions] = useState(() =>
    admin
      ? {
          // select: true,
          topic: true,
          chapter: true,
          Keywords: true,
          statement: true,
          status: true,
          edit: true,
        }
      : {
          // select: true,
          topic: true,
          chapter: true,
          Keywords: true,
          Questions: true,
        },
  );

  // Take out the type either 'all question' or 'selected'
  const questionsType = searchParams.get('questions');

  // Num of pages
  let numOfPages;
  if (questionsType === 'allQuestions' || questionsType === undefined) {
    if (state.filteredData?.length > 0) {
      numOfPages = Math.ceil(state.filteredData.length / 10);
    } else {
      numOfPages = Math.ceil(state.searchResults.length / 10);
    }
  } else if (questionsType === 'selected') {
    numOfPages = Math.ceil(state.selectedData.length / 10);
  }

  // Data to be displayed in the table
  // Slice the data from the array according to the page
  const dataSlice = currentPage - 1;
  let data;
  if (state.filteredData.length > 0) {
    data = state.filteredData.slice(dataSlice * 10, currentPage * 10);
  } else if (state.filteredData.length === 0 && state.filterExact) {
    data = [];
  } else {
    data = state.searchResults.slice(dataSlice * 10, currentPage * 10);
  }
  if (questionsType === 'selected') {
    data = state.selectedData.slice(dataSlice * 10, currentPage * 10);
  }

  // Function to handle the select all checkbox
  const handleSelectAllChange = event => {
    const { checked } = event.target;
    setSelectAllChecked(checked);
    if (checked) {
      data.forEach(item => setSelectedData(item));
    } else {
      data.forEach(item => removeSelectedData(item.id));
    }
  };

  // Function to handle individual row checkbox changes
  const handleCheckboxChange = (event, question) => {
    const { checked, id } = event.target;
    setCheckedOptions(prev => ({
      ...prev,
      [id]: checked,
    }));

    if (question) {
      if (checked) {
        setSelectedData(question);
      } else {
        removeSelectedData(question.id); // Remove the question from selectedData
      }
    }
  };

  // const handleCheckboxChange = (event) => {
  //   const { id, checked } = event.target;
  //   setCheckedOptions(prev => ({
  //       ...prev,
  //       [id]: checked,
  //   }));
  // };
  // Function to handle pages
  const handlePages = next => {
    if (!next) {
      if (currentPage === 1) return;
      return setCurrentPage(prev => prev - 1);
    }
    if (currentPage === numOfPages) return;
    return setCurrentPage(prev => prev + 1);
  };

  // Table Headers
  const headers = Object.keys(checkedOptions).filter(
    opt => checkedOptions[opt] === true,
  );

  // Reset current page to one when changing between all questions and selected
  useEffect(() => {
    setCurrentPage(1);
    setSelectAllChecked(false); // Reset the select all checkbox
  }, [questionsType, state.filteredData]);

  // If the data is not arrived refetch
  useEffect(() => {
    if (state.searchResults.length === 0) {
      queryClient.fetchQuery({ queryKey: ['all-questions'] });
    }
  }, [state.searchResults, queryClient]);
  const [filteredData, setFilteredData] = useState(null);

  const getFilteredData = data => {
    setFilteredData(data);
  };

  return (
    <section className="bg-white px-3 pb-10 ">
      {/* Result Filter */}
      <QuestionsResultFilter
        checkedOptions={checkedOptions}
        onCheckboxChange={handleCheckboxChange}
        admin={admin}
        getFilteredData={getFilteredData}
      />

      {/* Data Table */}
      <div className="mx-auto max-h-[80dvh] w-full min-w-[300px] overflow-hidden rounded-lg border-2 border-gray-400 md:mt-20">
        <div className="max-h-[70dvh] w-full overflow-auto">
          <Table className="w-full border-collapse overflow-auto">
            <Table.Head>
              <Table.Row className="sticky top-0 z-0 bg-gray-200">
                <th className="px-3 py-2 text-start capitalize">
                  <DisplayQuestionsItem
                    question={{ id: 'selectAll' }}
                    handleSelectQuestion={handleSelectAllChange}
                    checked={selectAllChecked}
                  />
                </th>
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
              {(filteredData && filteredData.length > 0
                ? filteredData
                : data
              ).map(dta => (
                <Table.Row key={dta.id}>
                  <Table.Data>
                    <DisplayQuestionsItem
                      question={dta}
                      handleSelectQuestion={handleCheckboxChange}
                      checked={state.selectedData.some(
                        item => item.id === dta.id,
                      )}
                    />
                  </Table.Data>
                  <Table.Data>
                    <div className="flex items-center gap-2">{dta.id}</div>
                  </Table.Data>
                  {checkedOptions.topic && <Table.Data>{dta.Topic}</Table.Data>}
                  {checkedOptions.chapter && (
                    <Table.Data>{dta.Chapter}</Table.Data>
                  )}
                  {checkedOptions.Keywords && (
                    <Table.Data>{dta.Keywords}</Table.Data>
                  )}
                  {(checkedOptions.Questions || checkedOptions.statement) && (
                    <Table.Data
                      className={
                        dta.statement?.length > 60 ? 'text-[0.8rem]' : ''
                      }
                    >
                      {dta.Statement}
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
                        Edit
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
        <div className="sticky bottom-0 flex flex-wrap items-center justify-between bg-gray-200 px-3 py-2">
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
