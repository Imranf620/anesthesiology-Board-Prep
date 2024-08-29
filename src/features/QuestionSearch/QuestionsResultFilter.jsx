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
  admin
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [action, setAction] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const ref = useOutsideClick(() => {
    setShowMenu(false);
    setShowActionMenu(false);
    setShowCategoryMenu(false);
  });
  const { state } = useSearchResultContext();
  const optionsArr = Object.keys(checkedOptions);

  const handleSelectedOption = (opt) => {
    searchParams.set('questions', opt);
    setSearchParams(searchParams);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };
  const createTestBasedOnCategories = () => {
    console.log('Creating test with categories:', selectedCategories);
    searchParams.set('categories', selectedCategories.join(','));
    setSearchParams(searchParams);
  };
  

  const handleAction = () => {
    // Handle the action here (e.g., update the state or make an API call)
    console.log(action);
    setAction('');
    setShowActionMenu(false);
  };

  const handleSelectAll = e => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    // Set all options to checked or unchecked
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
    // Update select all checkbox state based on individual checkboxes
    const allChecked = optionsArr.every(opt => checkedOptions[opt]);
    setSelectAll(allChecked);
  }, [checkedOptions]);

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-y-4 px-10 md:h-[70px]">
      <div className="flex items-center gap-4 self-stretch pt-4">
        <div
          className={`${searchParams.get('questions') === 'allQuestions'
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
          className={`${searchParams.get('questions') === 'selected'
            ? 'border-primary-500'
            : 'border-transparent'
            } cursor-pointer border-b-4 pb-2 text-[1.1rem] font-[500] hover:border-primary-500`}
        >
          Selected {state.selectedData.length}
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          // disabled={!keyword || isLoading}
          type="button"
          variant="dark"
          className="text-[1rem] w-max"
          onClick={createTestBasedOnCategories}
          disabled={selectedCategories.length === 0}
        >
          Create Test
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {/* Select Columns to show */}
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

              {/* <CheckedInput disable={true} option="All Selected" />
              <CheckedInput disable={true} option="Serial Number" /> */}
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
              onClick={() => setShowActionMenu((prev) => !prev)}
              className="flex w-[10rem] items-center justify-between rounded-md border-2 px-3 py-2 text-start"
            >
              <span>status</span>
              <span>
                <IoChevronDownOutline />
              </span>
            </button>
            {showActionMenu && (
              <div
                ref={ref}
                className="absolute bottom-0 z-30 flex w-[15rem] translate-y-full flex-col rounded-md bg-white py-2 shadow-lg"
              >
                <span
                  onClick={() => setAction('active')}
                  className="px-4 py-2 hover:bg-primary-200"
                >
                  Make it Active
                </span>
                <span
                  onClick={() => setAction('inactive')}
                  className="px-4 py-2 hover:bg-primary-200"
                >
                  Make it Inactive
                </span>
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleAction}
                    className="bg-primary-500 px-3 py-1 text-sm text-white hover:bg-primary-600"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryMenu((prev) => !prev)}
            className="flex w-max gap-8 items-center justify-between rounded-md border-2 px-3 py-2 text-start"
          >
            <span>Select Category</span>
            <span>
              <IoChevronDownOutline />
            </span>
          </button>
          {showCategoryMenu && (
            <ul
              ref={ref}
              className="absolute bottom-0 z-30 flex w-[18rem] translate-y-full flex-col rounded-md bg-white py-2 shadow-lg"
            >
              <li className="px-4 py-2">
                <span className="font-bold">Basic Sciences</span>
                <ul className="pl-4">
                  <li
                    className={`py-1 hover:bg-primary-100 ${selectedCategories.includes('Anatomy') ? 'bg-primary-100' : ''}`}
                    onClick={() => handleCategorySelection('Anatomy')}
                  >
                    Anatomy
                  </li>
                  <li
                    className={`py-1 hover:bg-primary-100 ${selectedCategories.includes('Physics, Monitoring') ? 'bg-primary-100' : ''}`}
                    onClick={() => handleCategorySelection('Physics, Monitoring')}
                  >
                    Physics, Monitoring
                  </li>
                  <li
                    className={`py-1 hover:bg-primary-100 ${selectedCategories.includes('Anesthesia Delivery Devices') ? 'bg-primary-100' : ''}`}
                    onClick={() => handleCategorySelection('Anesthesia Delivery Devices')}
                  >
                    Anesthesia Delivery Devices
                  </li>
                  <li
                    className={`py-1 hover:bg-primary-100 ${selectedCategories.includes('Mathematics') ? 'bg-primary-100' : ''}`}
                    onClick={() => handleCategorySelection('Mathematics')}
                  >
                    Mathematics
                  </li>
                  <li
                    className={`py-1 hover:bg-primary-100 ${selectedCategories.includes('Pharmacology') ? 'bg-primary-100' : ''}`}
                    onClick={() => handleCategorySelection('Pharmacology')}
                  >
                    Pharmacology
                  </li>
                </ul>
              </li>

              <li className="px-4 py-2">
                <span className="font-bold">Clinical Sciences</span>
                <ul className="pl-4">
                  <li className="py-1 hover:bg-primary-100">
                    Regional Anesthesia
                  </li>
                  <li className="py-1 hover:bg-primary-100">Special Techniques</li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsResultFilter;




// import { useEffect, useState } from 'react';
// import { IoChevronDownOutline } from 'react-icons/io5';

// import { useOutsideClick } from '../../hooks/useOutsideClick';
// import { useSearchResultContext } from '../../context/SearchResultContext';
// import { useSearchParams } from 'react-router-dom';

// const CheckedInput = ({
//   onCheckboxChange,
//   checkedOptions,
//   option,
//   disable,

// }) => {
//   if (disable)
//     return (
//       <li className="flex items-center gap-3 px-3 py-2 hover:bg-primary-200">
//         <input
//           className="h-[1.1rem] w-[1.1rem] accent-primary-500"
//           type="checkbox"
//           checked={true}
//           id={option}
//           disabled
//         />
//         <label
//           htmlFor={option}
//           className="flex-1 cursor-pointer text-[1.1rem] capitalize"
//         >
//           {option}
//         </label>
//       </li>
//     );

//   const isChecked = checkedOptions[option];
//   return (
//     <li className="flex items-center gap-3 px-3 py-2 capitalize hover:bg-primary-200">
//       <input
//         onChange={onCheckboxChange}
//         className="h-[1.1rem] w-[1.1rem] accent-primary-500"
//         type="checkbox"
//         checked={isChecked}
//         id={option}
//       />
//       <label htmlFor={option} className="flex-1 cursor-pointer text-[1.1rem]">
//         {option}
//       </label>
//     </li>
//   );
// };

// const QuestionsResultFilter = ({
//   onCheckboxChange,
//   checkedOptions,
//   setCheckedOptions,
//   admin
// }) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [showMenu, setShowMenu] = useState(false);
//   const [showActionMenu, setShowActionMenu] = useState(false);
//   const [action, setAction] = useState('');
//   const [selectAll, setSelectAll] = useState(false);
//   console.log(admin)
//   const ref = useOutsideClick(() => {
//     setShowMenu(false);
//     setShowActionMenu(false);
//   });
//   const { state } = useSearchResultContext();
//   const optionsArr = Object.keys(checkedOptions);

//   const handleSelectedOption = opt => {
//     searchParams.set('questions', opt);
//     setSearchParams(searchParams);
//   };

//   const handleAction = () => {
//     // Handle the action here (e.g., update the state or make an API call)
//     console.log(action);
//     setAction('');
//     setShowActionMenu(false);
//   };

//   const handleSelectAll = e => {
//     const isChecked = e.target.checked;
//     setSelectAll(isChecked);
//     // Set all options to checked or unchecked
//     const updatedCheckedOptions = optionsArr.reduce((acc, opt) => {
//       acc[opt] = isChecked;
//       return acc;
//     }, {});
//     setCheckedOptions(updatedCheckedOptions);
//   };

//   useEffect(() => {
//     searchParams.set('questions', 'allQuestions');
//     setSearchParams(searchParams);
//   }, []);

//   useEffect(() => {
//     // Update select all checkbox state based on individual checkboxes
//     const allChecked = optionsArr.every(opt => checkedOptions[opt]);
//     setSelectAll(allChecked);
//   }, [checkedOptions]);

//   return (
//     <div className="mb-5 flex flex-wrap items-center justify-between gap-y-4 px-10 md:h-[70px]">
//       <div className="flex items-center gap-4 self-stretch ">
//         <div
//           className={`${
//             searchParams.get('questions') === 'allQuestions'
//               ? 'border-primary-500'
//               : 'border-transparent'
//           } cursor-pointer border-b-4 pb-2 text-[1.1rem] font-[500] hover:border-primary-500`}
//           onClick={() => handleSelectedOption('allQuestions')}
//         >
//           All Questions{' '}
//           {state.filteredData.length > 0
//             ? state.filteredData.length
//             : state.searchResults.length}
//         </div>
//         <div
//           onClick={() => handleSelectedOption('selected')}
//           className={`${
//             searchParams.get('questions') === 'selected'
//               ? 'border-primary-500'
//               : 'border-transparent'
//           } cursor-pointer border-b-4 pb-2 text-[1.1rem] font-[500] hover:border-primary-500`}
//         >
//           Selected {state.selectedData.length}
//         </div>
//       </div>

//       <div className="flex flex-wrap items-center gap-3">
//         {/* Select Columns to show */}
//         <div className="relative">
//           <button
//             onClick={() => setShowMenu(prev => !prev)}
//             className="flex w-[10rem] items-center justify-between rounded-md border-2 px-3 py-2 text-start"
//           >
//             <span>Select Columns</span>
//             <span>
//               <IoChevronDownOutline />
//             </span>
//           </button>
//           {showMenu && (
//             <ul
//               ref={ref}
//               className="absolute bottom-0 z-30 flex w-[15rem] translate-y-full flex-col rounded-md bg-white py-2 shadow-lg"
//             >
             
//               <CheckedInput disable={true} option="All Selected" />
//               <CheckedInput disable={true} option="Serial Number" />
//               {optionsArr.map(opt => (
//                 <CheckedInput
//                   key={opt}
//                   option={opt}
//                   checkedOptions={checkedOptions}
//                   onCheckboxChange={onCheckboxChange}
//                 />
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Action Dropdown */}
//    { admin &&   <div className="relative">
//           <button
//             onClick={() => setShowActionMenu(prev => !prev)}
//             className="flex w-[10rem] items-center justify-between rounded-md border-2 px-3 py-2 text-start"
//           >
//             <span>Actions</span>
//             <span>
//               <IoChevronDownOutline />
//             </span>
//           </button>
//           {showActionMenu && (
//             <div
//               ref={ref}
//               className="absolute bottom-0 z-30 flex w-[15rem] translate-y-full flex-col rounded-md bg-white py-2 shadow-lg"
//             >
//               <span
//                 onClick={() => setAction('active')}
//                 className="px-4 py-2 hover:bg-primary-200"
//               >
//                 Make it Active
//               </span>
//               <span
//                 onClick={() => setAction('inactive')}
//                 className="px-4 py-2 hover:bg-primary-200"
//               >
//                 Make it Inactive
//               </span>
//               <div className="mt-2 flex justify-end">
//                 <button
//                   onClick={handleAction}
//                   className="bg-primary-500 px-3 py-1 text-sm text-white hover:bg-primary-600"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>}
//       </div>
//     </div>
//   );
// };

// export default QuestionsResultFilter;
