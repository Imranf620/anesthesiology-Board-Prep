import Heading from "./Heading";
import Button from "./Button";

const ErrorFallback = ({ resetErrorBoundary, error }) => {
  return (
    <section className="w-full h-screen items-center justify-center flex flex-col gap-3 -mt-6">
      <Heading>Something went very wrong 🤔</Heading>
      <p>{error.message}</p>
      <Button
        variant="underline"
        onClick={resetErrorBoundary}
        className="w-max py-2 px-6 flex items-center gap-3"
      >
        Try again
      </Button>
    </section>
  );
};

export default ErrorFallback;
