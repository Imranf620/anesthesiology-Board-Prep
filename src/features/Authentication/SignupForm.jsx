import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

import { useSignup } from './useSignup';
import { toast } from 'react-toastify';
import { updateHeaders } from '../../utils/api';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { signup, isLoading } = useSignup();

  const navigate = useNavigate();
  const onSubmit = data => {
    // Handle form submission
    signup(data, {
      onSuccess: data => {
        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);
        localStorage.setItem('new', 1);
        updateHeaders();
        navigate('/');
      },
      onError: err => toast.error(err.message, { autoClose: 6000 }),
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-14 mt-5 text-center text-4xl">Create an account</h2>
      <div className="flex flex-col gap-5">
        <Input
          label="Full Name"
          type="text"
          id="name"
          placeholder="Type your name"
          register={register}
          required="Name is required!"
          error={errors.name && errors.name.message}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col gap-5">
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="name@example.com"
          register={register}
          required="Email is required!"
          error={errors.email && errors.email.message}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label="Password"
          type="password"
          id="password"
          required="Password is required!"
          error={errors.password && errors.password.message}
          register={register}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          required="Confirm Password is required!"
          getValues={getValues}
          error={errors.confirmPassword && errors.confirmPassword.message}
          register={register}
          disabled={isLoading}
        />
      </div>

      <Button
        className="mt-3 w-full text-[1.2rem]"
        disabled={isLoading}
        isLoading={isLoading}
        type="submit"
        variant="dark"
      >
        Create Account
      </Button>

      <div className="mt-10 flex justify-center gap-2">
        <span> Already have an account?</span>{' '}
        <Link to="/login" className="  text-primary-400 underline">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
