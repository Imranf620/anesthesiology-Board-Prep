import { useMutation } from '@tanstack/react-query';
import { createUpdateNote as createUpdateNoteApi } from '../../services/apiNotes';

export const useCreateUpdateNote = () => {
  const { mutate: createUpdateNote, status } = useMutation({
    mutationFn: data => createUpdateNoteApi(data),
  });
  const isLoading = status === 'pending';

  return { createUpdateNote, isLoading };
};
