import Chart from '../../Dashboard/PieChart';
import { groupArrayWithFields } from '../../../utils/groupArrayWithFields';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const FinancialChart = ({ financials, field, title, isLoading, last }) => {
  const groupSubscriptionsByField =
    financials && groupArrayWithFields(financials, field);

  const data =
    groupSubscriptionsByField &&
    Object.keys(groupSubscriptionsByField).map(key => {
      const arr = groupSubscriptionsByField[key];
      const total = arr.reduce((acc, itm) => acc + itm.amount, 0) / 100;
      return {
        name: key,
        value: total,
      };
    });
  const total = data?.reduce((acc, itm) => acc + itm.value, 0);
  const preparedData = data?.map(obj => {
    const value = parseFloat(obj.value);
    return { name: obj.name, value };
  });

  function isEmptyObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  return (
    <div className="relative w-full">
      <h1 className="text-center text-[1.5rem] uppercase tracking-wider text-primary-400">
        {title}
      </h1>
      {isLoading && (
        <div className="flex h-[300px] items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {preparedData && !isEmptyObject(preparedData) && !isLoading && (
        <>
          {' '}
          <div className="h-[300px] w-full">
            <Chart data={preparedData} />
          </div>
          <h4 className="mb-2 text-[1.2rem] font-[500]">
            <span>Total: ${total}</span>
          </h4>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {Object.keys(groupSubscriptionsByField).map((key, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="font-[500]">{key}:</span>
                <span>{groupSubscriptionsByField[key].length}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {isEmptyObject(preparedData) && !isLoading && (
        <div className="my-10 flex h-full items-center justify-center px-3 text-center">
          No financials were found for last {last} days!
        </div>
      )}
    </div>
  );
};

export default FinancialChart;
