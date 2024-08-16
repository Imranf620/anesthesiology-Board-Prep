import { Link } from "react-router-dom";
import SignupForm from "../../features/Authentication/SignupForm";

const SignupPage = () => {
  return (
    <div className="max-w-[1500px] min-h-screen mx-auto px-3 flex flex-col gap-6 pb-14">
      <header className="flex justify-between items-center   mt-5">
        <div>
          <img src="/logo3.png" alt="Logo" className="w-[150px]" />
        </div>
      </header>
      <main>
        <SignupForm />
        <div className="flex flex-col items-center">
          <h4 className="text-2xl">Have Questions?</h4>
          <Link className="underline text-primary-500">Contact support</Link>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
