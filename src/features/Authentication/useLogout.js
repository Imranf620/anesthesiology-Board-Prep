import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useSearchResultContext } from '../../context/SearchResultContext';
import { useQuizContext } from '../../context/QuizContext';
import { toast } from 'react-toastify';
import { updateHeaders } from '../../utils/api';

export const useLogout = () => {
  const { clearSearchState } = useSearchResultContext();
  const { clearQuizState } = useQuizContext();
  const queryClient = useQueryClient();

  const { mutate: logout, status } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      updateHeaders();
      toast.success('Logout successfully!', { autoClose: 4000 });
      queryClient.clear();
      localStorage.clear();
      clearSearchState();
      clearQuizState();
      location.reload();
    },
  });
  const isLoading = status === 'pending';

  return { logout, isLoading };
};
