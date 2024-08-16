import { useMutation } from '@tanstack/react-query';
import { deleteNote as deleteNoteApi } from '../../services/apiNotes';

export const useDeleteNote = () => {
  const { mutate: deleteNote, status } = useMutation({
    mutationFn: id => deleteNoteApi(id),
  });
  const isLoading = status === 'pending';

  return { deleteNote, isLoading };
};
