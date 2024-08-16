import { toast } from 'react-toastify';
import Button from '../../../components/UI/Button';
import { useToggleUser } from './useToggleStatus';
import { useQueryClient } from '@tanstack/react-query';

const UserConfirm = ({ onCloseModal, userId, isActive }) => {
  const { toggleStatus, isLoading } = useToggleUser();
  const queryClient = useQueryClient();

  const handleConfirm = () => {
    const data = {
      username: localStorage.getItem('username'),
      user_to_toggle: userId,
    };
    console.log(data);
    toggleStatus(data, {
      onSuccess: () => {
        toast.success('User status successfully updated!', { autoClose: 5000 });
        queryClient.invalidateQueries({ queryKey: ['admin-users'] });
        onCloseModal();
      },
      onError: err => toast.error(err.message, { autoClose: 6000 }),
    });
  };

  return (
    <div>
      <h1 className="bg-primary-500 py-2 text-center text-[1.3rem] text-white">
        Are you sure?
      </h1>
      <p className="px-3 py-10 text-center">
        Are you sure you want to make this user{' '}
        {isActive ? 'In Active' : 'Active'}?
      </p>
      <div className="mb-4 flex items-center justify-end gap-3 px-3">
        <button
          disabled={isLoading}
          type="button"
          onClick={onCloseModal}
          className="rounded-md bg-primary-100 px-6 py-2 text-primary-500 outline-none"
        >
          Cancel
        </button>
        <Button
          onClick={handleConfirm}
          variant="dark"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default UserConfirm;
