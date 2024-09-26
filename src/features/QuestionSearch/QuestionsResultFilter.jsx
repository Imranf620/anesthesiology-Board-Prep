import { useEffect, useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import Button from '../../components/UI/Button';
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

const QuestionsResultFilter = ({
  onCheckboxChange,
  checkedOptions,
  setCheckedOptions,
  admin,
  data,
  getFilteredData,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [action, setAction] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const ref = useOutsideClick(() => {
    setShowMenu(false);
    setShowActionMenu(false);
    setShowCategoryMenu(false);
  });

  const { state } = useSearchResultContext();
  // console.log('state:', state);
  const optionsArr = Object.keys(checkedOptions);

  const handleSelectedOption = opt => {
    searchParams.set('questions', opt);
    setSearchParams(searchParams);
  };

  const handleCategorySelection = category => {
    setSelectedCategories(prevCategories => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter(cat => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });

    // Log the data of the selected topic
    const selectedTopicData = state.searchResults.filter(
      item => item.Topic === category,
    );
    getFilteredData(selectedTopicData);
    console.log('Selected Topic Data:', selectedTopicData);
  };

  const filterTableData = () => {
    if (!Array.isArray(data)) {
      console.error('Data is not an array');
      return;
    }

    if (selectedCategories.length === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        item =>
          selectedCategories.includes(item.chapter) ||
          selectedCategories.includes(item.topic),
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    filterTableData();
  }, [selectedCategories, data]);

  const createTestBasedOnCategories = () => {
    searchParams.set('categories', selectedCategories.join(','));
    setSearchParams(searchParams);
  };

  const handleAction = () => {
    setAction('');
    setShowActionMenu(false);
  };

  const handleSelectAll = e => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    const updatedCheckedOptions = optionsArr.reduce((acc, opt) => {
      acc[opt] = isChecked;
      return acc;
    }, {});
    setCheckedOptions(updatedCheckedOptions);
  };

  useEffect(() => {
    searchParams.set('questions', 'allQuestions');
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    const allChecked = optionsArr.every(opt => checkedOptions[opt]);
    setSelectAll(allChecked);
  }, [checkedOptions]);

  // Build a structure of chapters and their associated topics
  const chapterMap = {};
  state.searchResults.forEach(item => {
    if (!chapterMap[item.Chapter]) {
      chapterMap[item.Chapter] = new Set();
    }
    chapterMap[item.Chapter].add(item.Topic);
  });

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-y-4 px-10 md:h-[70px]">
      <div className="flex items-center gap-4 self-stretch ">
        <div
          className={`${searchParams.get('questions') === 'allQuestions' ? 'border-primary-500' : 'border-transparent'} cursor-pointer border-b-4 pb-2 text-[1.1rem] font-[500] hover:border-primary-500`}
          onClick={() => handleSelectedOption('allQuestions')}
        >
          All Questions{' '}
          {state.filteredData.length > 0
            ? state.filteredData.length
            : state.searchResults.length}
        </div>
        <div
          onClick={() => handleSelectedOption('selected')}
          className={`${searchParams.get('questions') === 'selected' ? 'border-primary-500' : 'border-transparent'} cursor-pointer border-b-4 pb-2 text-[1.1rem] font-[500] hover:border-primary-500 `}
        >
          Selected {state.selectedData.length}
        </div>
      </div>
      {!admin && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="dark"
            className="w-max text-[1rem]"
            onClick={createTestBasedOnCategories}
            disabled={state.selectedData.length === 0}
          >
            Create Test
          </Button>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowMenu(prev => !prev)}
            className="flex w-[12rem] items-center justify-between rounded-md border-2 px-3 py-2 text-start"
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
              {optionsArr.map(opt => (
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

        {/* Action Dropdown */}
        {admin && (
          <div className="relative">
            <button
              onClick={() => setShowActionMenu(prev => !prev)}
              className="flex w-[12rem] items-center justify-between rounded-md border-2 px-3 py-2 text-start"
            >
              <span>Status</span>
              <span>
                <IoChevronDownOutline />
              </span>
            </button>
            {showActionMenu && (
              <ul
                ref={ref}
                className="absolute bottom-0 z-30 flex w-[15rem] translate-y-full flex-col rounded-md bg-white py-2 shadow-lg"
              >
                <li
                  onClick={() => setAction('active')}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 text-[1.1rem] capitalize hover:bg-primary-200"
                >
                  Make it Active
                </li>
                <li
                  onClick={() => setAction('inactive')}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 text-[1.1rem] capitalize hover:bg-primary-200"
                >
                  Make it Inactive
                </li>
                <div className="flex justify-end px-3 py-2">
                  <Button
                    onClick={handleAction}
                    className="h-10 w-24"
                    variant="dark"
                  >
                    Confirm
                  </Button>
                </div>
              </ul>
            )}
          </div>
        )}

        {/* Category Dropdown */}
        {!admin && (
          <div className="relative">
            <button
              onClick={() => setShowCategoryMenu(prev => !prev)}
              className="flex w-[18rem] items-center justify-between rounded-md border-2 px-3 py-2 text-start"
            >
              <span>Select Category</span>
              <span>
                <IoChevronDownOutline />
              </span>
            </button>
            {showCategoryMenu && (
              <ul
                ref={ref}
                className="absolute bottom-0 z-30 flex max-h-48 w-[18rem] translate-y-full flex-col overflow-y-auto rounded-md bg-white py-2 shadow-lg"
              >
                {Object.keys(chapterMap).map(chapter => (
                  <li key={chapter} className="px-4 py-2">
                    <span
                      className="font-bold"
                      onClick={() => handleCategorySelection(topic)}
                    >
                      {chapter}
                    </span>
                    <ul className="pl-4">
                      {[...chapterMap[chapter]].map(topic => (
                        <li
                          key={topic}
                          onClick={() => handleCategorySelection(topic)}
                          className="cursor-pointer px-2 py-1 hover:bg-primary-200"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsResultFilter;
