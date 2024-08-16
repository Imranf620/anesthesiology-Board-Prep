import Heading from '../../../components/UI/Heading';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import Table from '../../../components/UI/Table';
import { useGetFinancials } from './useGetFinancials';
import FinancialChart from './FinancialChart';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sortDataByDates } from '../../../utils/sortDataByDates';
import Tab from '../../../components/UI/Tab';

const Financials = () => {
  const [searchParams] = useSearchParams();
  const last = +searchParams.get('last') || 7;

  const { financials, isError, isLoading } = useGetFinancials(last);
  const data = useGetFinancials(last);

  
  const [filterFinancials, setFilterFinancials] = useState();

  useEffect(() => {
    const extractDate = (itm) => itm.date;
    const sortedFinancials =
      financials &&
      financials.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

    setFilterFinancials(
      financials && sortDataByDates(sortedFinancials, last, extractDate),
    );
  }, [financials, last]);

  return (
    <div className="flex flex-col gap-5  px-2 py-10 sm:px-4 md:px-10 md:py-5">
      <section className="flex flex-wrap items-center justify-between">
        <Heading>Financials</Heading>

        <Tab url defaultValue={7} tabs={[7, 30, 90]} />
      </section>

      <section className="grid w-full grid-cols-1 gap-3 rounded-xl md:grid-cols-2">
        <div className="w-full rounded-xl bg-white p-7 shadow-xl">
          <FinancialChart
            financials={filterFinancials}
            field="plan"
            title="Subscriptions"
            isLoading={isLoading}
            last={last}
          />
        </div>
        <div className="w-full rounded-xl bg-white p-7 shadow-xl">
          <FinancialChart
            financials={filterFinancials}
            field="promo"
            title="Promo Subscriptions"
            isLoading={isLoading}
            last={last}
          />
        </div>
      </section>

      <section className="mx-3 md:mx-0">
        <div className="w-full min-w-[100%] overflow-x-auto border-2 border-primary-100 text-[0.9rem] md:text-[1rem]">
          <Table>
            <Table.Head>
              <Table.Row className="border-2 border-primary-100 bg-primary-100 text-center text-[1.2rem] font-[600]">
                <Table.Data className="text-start">Email</Table.Data>
                <Table.Data>Plan</Table.Data>
                <Table.Data>Amount</Table.Data>
                <Table.Data>Promo</Table.Data>
                <Table.Data>Date</Table.Data>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {financials &&
                filterFinancials?.length > 0 &&
                !isError &&
                !isLoading &&
                filterFinancials?.map((itm, i) => (
                  <Table.Row
                    key={i}
                    className="border-2 border-primary-100 text-center"
                  >
                    <Table.Data className="text-start">{itm?.email}</Table.Data>
                    <Table.Data>{itm?.plan}</Table.Data>
                    <Table.Data>${itm?.amount / 100}</Table.Data>
                    <Table.Data>{itm?.promo}</Table.Data>
                    <Table.Data>
                      <div className="w-max">{itm?.date}</div>
                    </Table.Data>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
          {isLoading && (
            <div className="my-20 flex justify-center">
              <LoadingSpinner />
            </div>
          )}
          {isError && !isLoading && (
            <div className="my-20 flex justify-center">
              There was an error while fetching please try again!
            </div>
          )}
          {filterFinancials?.length === 0 && financials && !isLoading && (
            <p className="my-20 text-center">
              No financials were found for the last {last} days!
            </p>
          )}
          {!isLoading && financials && financials.length === 0 && (
            <div className="my-20 flex justify-center">
              No results were found!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Financials;
