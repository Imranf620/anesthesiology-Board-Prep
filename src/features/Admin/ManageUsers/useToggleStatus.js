import { useMutation } from '@tanstack/react-query';
import { toggleUserStatus } from '../../../services/apiAdmin';

export const useToggleUser = () => {
  const { mutate: toggleStatus, status } = useMutation({
    mutationFn: data => toggleUserStatus(data),
  });
  const isLoading = status === 'pending';

  return { toggleStatus, isLoading };
};
