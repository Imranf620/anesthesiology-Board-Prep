import { useQuery } from '@tanstack/react-query';
import { getNotes } from '../../services/apiNotes';

export const useGetNotes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: () => getNotes({ username: localStorage.getItem('username') }),
  });
  return { data, isLoading };
};
