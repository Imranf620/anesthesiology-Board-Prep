import { Link } from 'react-router-dom';
import LoginForm from '../../features/Authentication/LoginForm';
import { useScreen } from '../../hooks/useScreen';

import { TfiHelpAlt } from 'react-icons/tfi';
import { useHelpContext } from '../../context/HelpContext';
import Help from '../../features/Help/Help';

const LoginPage = () => {
  const { screen } = useScreen();
  const { handleShowHelp } = useHelpContext();

  return (
    <div className="mx-auto mt-5 flex min-h-screen flex-col gap-6 px-3 pb-14 lg:max-w-[1500px]">
      {screen > 600 && (
        <header className="mt-5 flex flex-wrap items-center   justify-between">
          <div>
            <img src="/logo1.png" alt="Logo" className="h-[100px]" />
          </div>
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={handleShowHelp}
          >
            <TfiHelpAlt />
            <span>Help</span>
          </div>
        </header>
      )}
      <Help />
      <div className="w-[300px]"></div>
      <main>
        <LoginForm />
        <div className="flex flex-col items-center">
          <h4 className="text-2xl">Have Questions?</h4>
          <Link onClick={handleShowHelp} className="text-primary-500 underline">
            Contact support
          </Link>
        </div>
        <Link
          to="#"
          className="mt-3 flex justify-center text-primary-400  underline md:justify-end"
        >
          Forgot Password?
        </Link>{' '}
      </main>
    </div>
  );
};

export default LoginPage;
