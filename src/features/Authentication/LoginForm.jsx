import { useForm } from 'react-hook-form';
import Button from '../../components/UI/Button';

import Input from '../../components/UI/Input';
import { useLogin } from './useLogin';
import { useScreen } from '../../hooks/useScreen';
import { useQueryClient } from '@tanstack/react-query';
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si';
import { FaFacebook } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { updateHeaders } from '../../utils/api';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useLoginWithGoogle } from './useLoginWithGoogle';
import FullPageLoading from '../../components/UI/FullPageLoading';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({});
  const { screen } = useScreen();
  const { login, isLoading } = useLogin();
  const { googleLogin, isLoading: isLoadingGoogle } = useLoginWithGoogle();

  // Google login function
  const loginWithGooggle = useGoogleLogin({
    onSuccess: async res => {
      const result = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${res.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${res.access_token}`,
            Accept: 'application/json',
          },
        },
      );
      const data = {
        idToken: res.access_token,
        name: result.data.name,
        email: result.data.email,
      };
      googleLogin(data, {
        onSuccess: data => {
          toast.success('Login successfully!', { autoClose: 4000 });
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('username', data.data.username);
          updateHeaders();
          queryClient.fetchQuery({ queryKey: ['user-profile'] });
        },
        onError: err => {
          toast.error(err.message, { autoClose: 15000 });
        },
      });
    },
  });
  const queryClient = useQueryClient();
  const onSubmit = data => {
    // Handle form submission
    login(data, {
      onSuccess: data => {
        toast.success('Login successfully!', { autoClose: 4000 });
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('username', data.data.username);

        updateHeaders();
        queryClient.fetchQuery({ queryKey: ['user-profile'] });
        queryClient.fetchQuery({ queryKey: ['user'] });
      },
      onError: err => {
        if (err.message === 'User not Found!') {
          setError('email', {
            type: 'email',
            message: 'Invalid email or password',
          });
          setError('password', {
            type: 'password',
            message: '',
          });
        } else {
          toast.error(err.message, { autoClose: 'none' });
        }
      },
    });
  };

  return (
    <>
      {isLoadingGoogle && <FullPageLoading />}
      <form
        className="form border-2 border-gray-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        {screen <= 600 && (
          <div className="flex justify-center ">
            <img src="/logo3.png" alt="Logo" className="w-[150px]" />
          </div>
        )}
        <h2 className="mb-14 mt-5 text-center text-4xl">Sign In</h2>
        <div className="flex flex-col gap-2">
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
        <div className="mt-5 flex flex-col gap-y-3">
          <Button
            disabled={isLoading}
            variant="dark"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="text-[1.2rem]"
            isLoading={isLoading}
          >
            Sign in
          </Button>
          {/* <button
          type="button"
          className="  flex items-center justify-center gap-3 rounded-md border-2 border-gray-300 py-3 font-[500] hover:border-gray-400"
        >
          <FaFacebook className="text-[1.5rem] text-blue-500" />
          <span>Sign in with Facebook</span>
        </button> */}
          <button
            onClick={loginWithGooggle}
            type="button"
            className="flex items-center justify-center gap-3 rounded-md border-2 border-gray-300 py-3 font-[500] hover:border-gray-400"
          >
            <FcGoogle className="text-[1.5rem]" />
            <span>Sign in with Google</span>
          </button>
          {/* <button
          type="button"
          className="flex items-center justify-center gap-3 rounded-md border-2 border-gray-300 py-3 font-[500] hover:border-gray-400"
        >
          <SiGithub className="text-[1.5rem]" />
          <span>Sign in with Github</span>
        </button> */}
          <div className="flex flex-1 items-center justify-between gap-3 text-gray-500">
            <div className="h-[1px] flex-1 bg-gray-500"></div>
            <div>OR</div>
            <div className="h-[1px] flex-1 bg-gray-500"></div>
          </div>
          <Button
            // type="button"
            link={true}
            to="/payment-plan"
            variant="outlined"
            className="hover:bg-gray-300/20 hover:text-black"
          >
            Get Started
          </Button>
          <p className="mt-6 text-center font-[0.9rem]">
            Don't have an account?{' '}
            <Link to="/signup" className="underline">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
