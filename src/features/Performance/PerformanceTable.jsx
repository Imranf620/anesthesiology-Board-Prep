import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeQuiz } from '../Quiz/useResumeQuiz';
import { useQuizContext } from '../../context/QuizContext';
import { TABS } from '../../utils/constants';
import Table from '../../components/UI/Table';
import StatusTag from '../../components/UI/StatusTag';
import Button from '../../components/UI/Button';
import Tab from '../../components/UI/Tab';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { toast } from 'react-toastify';
import { prepareResumeTest } from '../../utils/prepareResumeTest';

const TABLE_HEAD = [
  'Test Name',
  'Status',
  'Questions',
  'Score',
  'Correct',
  'Wrong',
  'Date',
];

const PerformanceTable = ({ dashboard, results, isLoading, admin }) => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const { resumeQuiz, isLoading: isLoadingQuiz } = useResumeQuiz();
  const { setQuiz } = useQuizContext();
  const navigate = useNavigate();

  const dateMod = date => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('en-US');
    return formattedDate;
  };

  // Show only 5 results if the data is greater
  let sliceResults;
  if (results) {
    sliceResults =
      dashboard && results.length > 5
        ? results.slice().reverse().slice(0, 5)
        : results.slice().reverse();
  }

  let data;
  if (selectedTab === 'all') {
    data = sliceResults && sliceResults;
  }
  if (selectedTab === 'in progress') {
    data = sliceResults.filter(
      tst => tst.TestStatus.toLowerCase() === selectedTab,
    );
  }
  if (selectedTab === 'completed') {
    data = sliceResults.filter(
      tst => tst.TestStatus.toLowerCase() === selectedTab,
    );
  }
  if (selectedTab === 'passed') {
    data = sliceResults.filter(
      tst => tst.TestStatus.toLowerCase() === 'completed' && tst.Score >= 85,
    );
  }
  if (selectedTab === 'failed') {
    data = sliceResults.filter(
      tst =>
        tst.TestStatus.toLowerCase() === 'completed' &&
        (tst.Score < 50 || tst.Score === undefined),
    );
  }

  // Redirect to resume quiz or see result
  const handleNavigate = (tstId, status) => {
    const data = {
      username: localStorage.getItem('username'),
      userTestID: tstId,
    };
    resumeQuiz(data, {
      onSuccess: _data => {
        const { data, url } = prepareResumeTest(_data, status);
        setQuiz(data);
        navigate(url);
      },
      onError: err => {
        toast.error(err.message);
      },
    });
  };

  return (
    <section className="flex flex-col py-4  lg:mt-6">
      <h3 className="text-[1.2rem] font-[500]">Tests</h3>

      <Suspense fallback={<h1>Loading...</h1>}>
        <div
          className={`ml-3 flex-nowrap overflow-x-auto ${
            isLoading || !results ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <Tab tabs={TABS} setSelectedTab={setSelectedTab} />
        </div>
        {/* Table */}
        <div className="min-w-[100%] overflow-auto rounded-md border-2">
          <Table className="w-full">
            {/* Table Header */}
            <Table.Head className="">
              <Table.Row className="bg-gray-200">
                {TABLE_HEAD.map(itm => (
                  <th className="px-5 py-3 text-start" key={itm}>
                    {itm}
                  </th>
                ))}
                <th></th>
              </Table.Row>
            </Table.Head>

            {/* Table Body */}
            <Table.Body>
              {data &&
                data.map(test => (
                  <Table.Row key={test.UserTestID}>
                    <Table.Data>{test.TestName}</Table.Data>
                    <Table.Data>
                      <StatusTag status={test.TestStatus.toLowerCase()} />
                    </Table.Data>
                    <Table.Data>{test.Total}</Table.Data>
                    <Table.Data>
                      {test?.Score
                        ? test.Score + '%'
                        : test.TestStatus.toLowerCase() === 'completed'
                          ? '0%'
                          : '-'}
                    </Table.Data>
                    <Table.Data>{test.Correct ? test.Correct : '-'}</Table.Data>
                    <Table.Data>{test.Wrong ? test.Wrong : '-'}</Table.Data>
                    <Table.Data>{dateMod(test.Date_Added)}</Table.Data>
                    {!admin && (
                      <Table.Data>
                        <div className="w-fit">
                          <Button
                            disabled={isLoadingQuiz}
                            onClick={() =>
                              handleNavigate(test.UserTestID, test.TestStatus)
                            }
                            className="text-[0.8rem]"
                            variant="dark"
                          >
                            {test.TestStatus.toLowerCase() === 'in progress'
                              ? 'Resume'
                              : 'View'}
                          </Button>
                        </div>
                      </Table.Data>
                    )}
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
          {/* Loading indicator */}
          {!results?.length && isLoading && (
            <div className="my-16 text-center text-[1.1rem] font-[500]">
              <LoadingSpinner />
            </div>
          )}
          {/* If no results were found */}
          {!results?.length && !isLoading && (
            <div className="my-16 text-center text-[1.1rem] font-[500]">
              No results were found!
            </div>
          )}
        </div>
      </Suspense>
      {/* If dashboard show button to navigate to performance page */}
      {dashboard && (
        <Button
          onClick={() => navigate('/performance')}
          type="button"
          variant="outlined"
          className="mt-3"
        >
          Show all results
        </Button>
      )}
    </section>
  );
};

export default PerformanceTable;
