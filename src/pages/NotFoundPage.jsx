import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen mx-auto flex items-center justify-center ">
      <div className="flex w-[500px] max-w-full bg-gray-300 p-16 rounded-lg shadow-lg flex-col items-center gap-5">
        <h1 className="text-[4rem] font-[500]">404</h1>
        <p className="text-[1.1rem]">
          The page you are looking for is not Found!
        </p>
        <Button
          onClick={() => navigate(-1, { replace: true })}
          variant="dark"
          className="px-8"
        >
          &larr; Go back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
