
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { updatePassword } from '../../services/apiUsers';

const PasswordForm = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        username: localStorage.getItem('username'),
        old_password: data.oldPass,
        new_password: data.password,
      };

      await updatePassword(payload);
      toast.success('Password updated successfully!');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to update password.');
    }
  };

  return (
    <div className="mx-auto w-[700px] max-w-[100%] rounded-xl bg-white p-12 shadow-2xl transition-transform duration-500 transform hover:scale-105">
      <h4 className="mb-8 text-2xl font-semibold">Change Password</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          register={register}
          label="Old Password"
          id="oldPass"
          type="password"
          required="Old Password is required!"
          error={errors?.oldPass?.message}
        />
        <Input
          label="New Password"
          type="password"
          id="password"
          required="Password is required!"
          error={errors?.password?.message}
          register={register}
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
        />
        <div className="flex justify-end">
          <Button variant="dark" type="submit">Change Password</Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;