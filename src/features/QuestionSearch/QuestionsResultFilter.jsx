import { useEffect, useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useSearchResultContext } from '../../context/SearchResultContext';
import { useSearchParams } from 'react-router-dom';

const CheckedInput = ({
  onCheckboxChange,
  checkedOptions,
  option,
  disable,
}) => {
  if (disable)
    return (
      <li className="flex items-center gap-3 px-3 py-2 hover:bg-primary-200">
        <input
          className="h-[1.1rem] w-[1.1rem] accent-primary-500"
          type="checkbox"
          checked={true}
          id={option}
          disabled
        />
        <label
          htmlFor={option}
          className="flex-1 cursor-pointer text-[1.1rem] capitalize"
        >
          {option}
        </label>
      </li>
    );

  const isChecked = checkedOptions[option];
  return (
    <li className="flex items-center gap-3 px-3 py-2 capitalize hover:bg-primary-200">
      <input
        onChange={onCheckboxChange}
        className="h-[1.1rem] w-[1.1rem] accent-primary-500"
        type="checkbox"
        checked={isChecked}
        id={option}
      />
      <label htmlFor={option} className="flex-1 cursor-pointer text-[1.1rem]">
        {option}
      </label>
    </li>
  );
};

const QuestionsResultFilter = ({ onCheckboxChange, checkedOptions, admin }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useOutsideClick(() => setShowMenu(false));
  const refStatus = useOutsideClick(() => setShowStatus(false));

  const { state } = useSearchResultContext();
  const optionsArr = Object.keys(checkedOptions);

  const StatusArr = ['active', 'inactive'];
  const [selectedStatus, setSelectedStatus] = useState({
    active: true,
    inactive: true,
  });
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Set initial selected statuses in the query string
    searchParams.set('status', 'active,inactive');
    searchParams.set('questions', 'allQuestions');
    setSearchParams(searchParams);
  }, []);

  const handleStatusChange = (status) => {
    const isChecked = selectedStatus[status];
    const updatedStatus = { ...selectedStatus, [status]: !isChecked };

    const selectedCount = Object.values(updatedStatus).filter(Boolean).length;

    if (selectedCount > 2) return; // Prevent selecting more than two statuses

    setSelectedStatus(updatedStatus);

    // Update the query string based on the selected statuses
    const selectedStatuses = Object.keys(updatedStatus)
      .filter((key) => updatedStatus[key])
      .join(',');

    if (selectedCount === 0) {
      searchParams.delete('status');
    } else {
      searchParams.set('status', selectedStatuses);
    }

    setSearchParams(searchParams);
  };

  const handleSelectedOption = (opt) => {
    searchParams.set('questions', opt);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-y-4 px-10 md:h-[70px]">
      <div className="flex items-center gap-4 self-stretch ">
        <div
          className={`${
            searchParams.get('questions') === 'allQuestions'
              ? 'border-primary-500'
              : 'border-transparent'
          } cursor-pointer border-b-4 pb-2 text-[1.1rem] font-[500] hover:border-primary-500`}
          onClick={() => handleSelectedOption('allQuestions')}
        >
          All Questions{' '}
          {state.filteredData.length > 0
            ? state.filteredData.length
            : state.searchResults.length}
        </div>
        <div
          onClick={() => handleSelectedOption('selected')}
          className={`${
            searchParams.get('questions') === 'selected'
              ? 'border-primary-500'
              : 'border-transparent'
          } cursor-pointer border-b-4 pb-2 text-[1.1rem] font-[500] hover:border-primary-500`}
        >
          Selected {state.selectedData.length}
        </div>
      </div>

      {/* Status Dropdown */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowStatus((prev) => !prev)}
            className="flex w-[15rem] items-center justify-between rounded-md border-2 px-3 py-2 text-start"
          >
            <span>Status</span>
            <span>
              <IoChevronDownOutline />
            </span>
          </button>
          {showStatus && (
            <ul
              ref={refStatus}
              className="absolute bottom-0 z-30 flex w-[15rem] translate-y-full flex-col rounded-md bg-white py-2 shadow-lg"
            >
              {StatusArr.map((status) => (
                <CheckedInput
                  key={status}
                  option={status}
                  checkedOptions={selectedStatus}
                  onCheckboxChange={() => handleStatusChange(status)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Select Columns to Show */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="flex w-[15rem] items-center justify-between rounded-md border-2 px-3 py-2 text-start"
          >
            <span>Select Columns</span>
            <span>
              <IoChevronDownOutline />
            </span>
          </button>
          {showMenu && (
            <ul
              ref={ref}
              className="absolute bottom-0 z-30 flex w-[15rem] translate-y-full flex-col rounded-md bg-white py-2 shadow-lg"
            >
              <CheckedInput disable={true} option="Serial Number" />
              {optionsArr.map((opt) => (
                <CheckedInput
                  key={opt}
                  option={opt}
                  checkedOptions={checkedOptions}
                  onCheckboxChange={onCheckboxChange}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsResultFilter;
