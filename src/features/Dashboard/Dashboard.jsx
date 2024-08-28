import { useEffect, useState, useRef } from 'react';
import PerformanceCard from '../../components/UI/PerformanceCard';
import PerformanceTable from '../Performance/PerformanceTable';
import { useGetResults } from './useGetResults';
import { FiEdit2 } from 'react-icons/fi';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Dashboard = () => {
  const { results, isLoading } = useGetResults();
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalPercentile, setGoalPercentile] = useState(90);
  const [goalInput, setGoalInput] = useState(goalPercentile);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [percentCorrect, setPercentCorrect] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [examDate, setExamDate] = useState(new Date());
  const [remainingDays, setRemainingDays] = useState(0);
  const calendarRef = useRef(null);
  const [hidePerformance, setHidePerformance] = useState(false);

  

  useEffect(() => {
    const storedHidePerformance = sessionStorage.getItem('hidePerformance');
    setHidePerformance(storedHidePerformance === 'true');
  }, []);

  const handleTogglePerformance = hide => {
    setHidePerformance(hide);
    sessionStorage.setItem('hidePerformance', hide);
  };


  useEffect(() => {
    if (results && results.length > 0) {
      let totalQ = 0;
      let totalC = 0;
      let totalW = 0;

      results.forEach(result => {
        totalQ += result.Total || 0;
        totalC += result.Correct || 0;
        totalW += result.Wrong || 0;
      });

      setTotalQuestions(totalQ);
      setTotalCorrect(totalC);
      setTotalWrong(totalW);
      setPercentCorrect(((totalC / totalQ) * 100).toFixed(2));
    }
  }, [results]);

  useEffect(() => {
    if (examDate) {
      const today = new Date();
      const timeDiff = examDate - today;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setRemainingDays(daysDiff);
    }
  }, [examDate]);

  const handleClickOutside = event => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <>
      <div className="relative mt-4 flex items-center justify-between rounded-md bg-slate-100 p-4">
        <div className="text-lg font-semibold">Anesthesiology ABA Advanced</div>
        <div className="flex items-center space-x-8">
          <div>
            <span className="flex items-center text-gray-500">
              Exam Date
              <FiEdit2
                className="ml-2 cursor-pointer text-gray-400"
                onClick={() => setShowCalendar(!showCalendar)}
              />
            </span>
            <span className="text-xl font-medium">
              {remainingDays} days remaining
            </span>
            {showCalendar && (
              <div
                className="absolute z-50 mt-2 rounded-lg bg-white p-4 shadow-lg"
                ref={calendarRef}
              >
                <DateRange
                  ranges={[
                    {
                      startDate: examDate,
                      endDate: examDate,
                      key: 'selection',
                    },
                  ]}
                  onChange={item => setExamDate(item.selection.startDate)}
                  minDate={new Date()}
                />
                <button
                  onClick={() => setShowCalendar(false)}
                  className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Select
                </button>
              </div>
            )}
          </div>
          <div>
            <span className="flex items-center text-gray-500">
              Goal Percentile
              <FiEdit2
                className="ml-2 cursor-pointer text-gray-400"
                onClick={() => setIsEditingGoal(true)}
              />
            </span>
            {isEditingGoal ? (
              <input
                type="number"
                value={goalInput}
                onChange={e => setGoalInput(e.target.value)}
                onBlur={() => {
                  setGoalPercentile(goalInput);
                  setIsEditingGoal(false);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setGoalPercentile(goalInput);
                    setIsEditingGoal(false);
                  }
                }}
                className="border-b border-gray-400 text-xl font-medium focus:outline-none"
              />
            ) : (
              <span className="text-xl font-medium">{goalPercentile}</span>
            )}
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-3 py-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[1.2rem] font-[500]">Performance Snapshot </h3>

          <div className="flex items-center gap-2 cursor-pointer">
      {hidePerformance ? (
        <div  className='flex items-center gap-2' onClick={() => handleTogglePerformance(false)}>
          <BsEye
            size={24}
            className="text-green-900"
          />
          <h1 className="text-[1.2rem] font-[500] text-black">Show</h1>
        </div>
      ) : (
        <div className='flex items-center gap-2' onClick={() => handleTogglePerformance(true)}>
          <BsEyeSlash
            size={24}
            className="text-green-900"
          />
          <h1 className="text-[1.2rem] font-[500] text-black">Hide</h1>
        </div>
      )}
    </div>

          
        </div>
        {!hidePerformance && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {/* Charts */}
            <PerformanceCard
              title="Overall Percent Correct"
              obtained={`${percentCorrect}%`}
              overallTitle="National Average"
              overall="67.5%"
              position={`${totalCorrect}/${totalQuestions} Correct/Total Questions taken`}
              chart={true}
              data={results}
            />
            <PerformanceCard
              title="Percentile"
              obtained="1st"
              overallTitle="Goal"
              overall="80th"
              position="1st last 100 Questions"
              chart={true}
              data={results}
            />
            <PerformanceCard
              title="Total Questions Taken"
              obtained={totalQuestions.toString()}
              overallTitle="Unique Questions"
              overall="18"
              position="1.8% of Bank Completed (1023 Qs)"
              chart={true}
              detail={results}
            />
          </div>
        )}
      </section>

      {/* User results table */}
      <PerformanceTable
        dashboard={true}
        results={results}
        isLoading={isLoading}
        admin={false}
      />
    </>
  );
};

export default Dashboard;