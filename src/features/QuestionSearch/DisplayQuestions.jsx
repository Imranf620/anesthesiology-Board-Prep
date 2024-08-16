import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchResultContext } from "../../context/SearchResultContext";
import QuestionsResultFilter from "./QuestionsResultFilter";
import Table from "../../components/UI/Table";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import DisplayQuestionsItem from "./DisplayQuestionsItem";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import Button from "../../components/UI/Button";

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
        }
  );
  // Take out the type either 'all question' or 'selected'
  const questionsType = searchParams.get("questions");

  // Num of pages
  let numOfPages;
  if (questionsType === "allQuestions" || questionsType === undefined) {
    if (state.filteredData?.length > 0) {
      numOfPages = Math.ceil(state.filteredData.length / 10);
    } else {
      numOfPages = Math.ceil(state.searchResults.length / 10);
    }
  } else if (questionsType === "selected") {
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
  if (questionsType === "selected") {
    data = state.selectedData.slice(dataSlice * 10, currentPage * 10);
  }

  // function to hanlde rows of the table
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedOptions({ ...checkedOptions, [id]: checked });
  };

  // funtion to add or remove the questions
  const handleSelectQuestion = (event, question) => {
    if (event.target.checked) {
      setSelectedData(question);
    }
    if (!event.target.checked) {
      removeSelectedData(question.id);
    }
  };

  // function to handle pages
  const handlePages = (next) => {
    if (!next) {
      if (currentPage === 1) return;
      return setCurrentPage((prev) => prev - 1);
    }
    if (currentPage === numOfPages) return;
    return setCurrentPage((prev) => prev + 1);
  };

  

  // Table Headers
  const headers = Object.keys(checkedOptions).filter(
    (opt) => checkedOptions[opt] === true
  );

 

  // Reset current page to one when changing btw all questions and selected
  useEffect(() => {
    setCurrentPage(1);
  }, [questionsType, state.filteredData]);

  // If the data is not arrived refetch
  useEffect(() => {
    if (state.searchResults.length === 0) {
      queryClient.fetchQuery({ queryKey: ["all-questions"] });
    }
  }, [state.searchResults, queryClient]);

  return (
    <section className="bg-white pb-10 px-3">
      {/* Result Filter */}
      <QuestionsResultFilter
        checkedOptions={checkedOptions}
        onCheckboxChange={handleCheckboxChange}
      />

      {/* Data Table */}
      <div className="min-w-[300px] overflow-hidden max-h-[80dvh] w-full mx-auto border-2 border-gray-400 rounded-lg">
        <div className="w-full max-h-[70dvh] overflow-auto">
          <Table className="w-full overflow-auto border-collapse">
            <Table.Head>
              <Table.Row className="sticky top-0 bg-gray-200 z-0">
                <th className="text-start px-3 py-2 capitalize">
                  Serial Number
                </th>
                {headers.map((header) => (
                  <th className="text-start px-3 py-2 capitalize" key={header}>
                    {header}
                  </th>
                ))}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {data.length > 0 &&
                data.map((dta) => (
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
                    {checkedOptions.Questions && (
                      <Table.Data
                        className={`${
                          dta?.Statement?.length > 60 ? "text-[0.8rem]" : ""
                        }`}
                      >
                        {dta?.Statement}
                      </Table.Data>
                    )}
                    {admin && checkedOptions.status && (
                      <Table.Data>
                        {dta.isActive === "Y" ? "Active" : "Not Active"}
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
                          Edit{" "}
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
          <div className="flex justify-center my-16">No result found!</div>
        )}

        {isLoading && (
          <div className="flex justify-center my-16">
            <LoadingSpinner />
          </div>
        )}

        {/* Pagination */}
        <div className="sticky bottom-0 flex flex-wrap  justify-between items-center py-2 px-3 bg-gray-200">
          <button
            onClick={() => handlePages(false)}
            disabled={!totalResults || currentPage === 1}
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50 py-2 px-3 rounded-md font-[500] flex items-center gap-3 opacity-80"
          >
            <HiArrowLeft />
            <span>Prev</span>
          </button>
          {/* Current page */}
          <span className="font-[500] text-gray-500">
            Pages:{" "}
            {!totalResults || (!state.filteredData.length && state.filterExact)
              ? "0"
              : currentPage}{" "}
            / {numOfPages}
          </span>
          <button
            disabled={!totalResults || currentPage === numOfPages}
            onClick={() => handlePages(true)}
            className="cursor-pointer disabled:cursor-not-allowed  hover:bg-gray-50 py-2 px-3 rounded-md font-[500] flex items-center gap-3 disabled:opacity-50 opacity-80"
          >
            <span>Next</span> <HiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DisplayQuestions;
