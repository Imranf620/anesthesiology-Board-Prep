import { HiX } from 'react-icons/hi';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import { useForm } from 'react-hook-form';
import { useSignup } from '../../Authentication/useSignup';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const AddUserForm = ({ onClose }) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isLoading } = useSignup();
  const queryClient = useQueryClient();

  const onSubmit = _data => {
    const { name, email, password } = _data;

    signup(
      { name, email, password },
      {
        onSuccess: () => {
          toast.success('User successfully created!', { autoClose: 4000 });
          queryClient.invalidateQueries({ queryKey: ['admin-users'] });
          onClose();
        },
        onError: err => toast.error(err.message, { autoClose: 6000 }),
      },
    );
  };

  return (
    <section className="mb-10 mt-4 rounded-md bg-gray-100 p-5 shadow-sm sm:p-10">
      <div className="flex justify-end ">
        <HiX
          className="cursor-pointer rounded-full bg-gray-200 p-2 text-[2.5rem] text-gray-500 hover:bg-gray-300 hover:text-gray-800"
          onClick={onClose}
        />
      </div>
      <h3 className="mb-7 text-center text-[1.5rem] font-[600] uppercase tracking-wider sm:text-[2rem]">
        Add User
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="User Name"
          id="name"
          type="text"
          register={register}
          required="User Name is required!"
          error={errors?.name?.message}
          disabled={false}
        />
        <Input
          label="Email Address"
          id="email"
          type="email"
          register={register}
          required="Email is required!"
          error={errors?.email?.message}
          disabled={false}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          register={register}
          required="Password is required!"
          error={errors?.password?.message}
          disabled={false}
          minLength={8}
        />
        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          required="Confirm Password is required!"
          getValues={getValues}
          error={errors?.confirmPassword?.message}
          register={register}
          disabled={false}
        />
        <div className="flex justify-end">
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            type="submit"
            variant="dark"
          >
            Add User
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddUserForm;
