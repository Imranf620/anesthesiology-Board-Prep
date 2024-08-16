import { useEffect, useState } from 'react';
import { useQuizContext } from '../../context/QuizContext';
import { useForm } from 'react-hook-form';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { useCreateUpdateNote } from '../Notes/useCreateUpdateNote';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const QuizNotes = ({ summary, question }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { state } = useQuizContext();
  const { register, handleSubmit, setValue } = useForm();
  const { createUpdateNote, isLoading } = useCreateUpdateNote();
  const queryClient = useQueryClient();
  const onSubmit = _data => {
    const data = {
      username: localStorage.getItem('username'),
      topic: question.Topic,
      userTestID: state.quiz.userTestID,
      questionID: question.QuestionID,
      description: _data.note,
    };
    createUpdateNote(data, {
      onSuccess: () => {
        toast.success('Note successfully updated!', { autoClose: 5000 });
        setIsEdit(false);
        queryClient.invalidateQueries({ queryKey: 'notes' });
      },

      onError: err => toast.error(err.message, { autoClose: 6000 }),
    });
  };
  useEffect(() => {
    setIsEdit(false);
    setValue('note', summary);
  }, [summary, setValue]);

  if (state.status !== 'completed' || !summary) return null;
  return isEdit ? (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
      <Input
        register={register}
        id="note"
        textArea
        label="Please enter note here:"
        autoFocus
        className="resize-none border-2 border-gray-200 focus:border-2 focus:border-primary-300"
        rows="10"
      />

      <div className="flex items-center justify-end gap-3">
        <Button
          disabled={isLoading}
          type="button"
          variant="outlined"
          onClick={() => setIsEdit(false)}
        >
          Clear All
        </Button>
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          variant="dark"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  ) : (
    <div className="mt-7 bg-gray-300 p-3">
      <div className="mb-3 flex gap-6">
        <h4 className="text-[1.1rem] font-[500]">Bottom Line</h4>
        <button className="text-blue-500" onClick={() => setIsEdit(true)}>
          Copy text as Note
        </button>
      </div>
      <p className="text-[0.9rem]">{summary}</p>
    </div>
  );
};

export default QuizNotes;
