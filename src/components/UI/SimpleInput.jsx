const SimpleInput = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`outline-none border-2 px-4 py-2 rounded-md  bg-transparent disabled:opacity-80 disabled:bg-gray-300 focus:border-primary-500 border-gray-300  ${className}`}
    />
  );
};

export default SimpleInput;
