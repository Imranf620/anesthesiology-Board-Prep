import { useQuery } from '@tanstack/react-query';
import { getFinancials } from '../../../services/apiAdmin';
import { addDays, format } from 'date-fns';

export const useGetFinancials = (last) => {
  const today = new Date();
  const dateTo = format(today, 'yyyy-MM-dd');
  const dateFrom = format(addDays(today, -last), 'yyyy-MM-dd');

  const {
    data: financials,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['admin-financials', last],
    queryFn: () => getFinancials(dateFrom, dateTo),
  });

  return { financials, isLoading, isError };
};
