const Input = ({
  label,
  id,
  type,
  register,
  required,
  error,
  minLength,
  getValues,
  disabled,
  placeholder,
  className = "",
  textArea = false,
  ...props
}) => {
  const validate = {
    required: required,
  };

  // Validate for password field
  if (type === "password") {
    validate.minLength = {
      value: minLength,
      message: `Password must be at least ${minLength} characters!`,
    };
  }

  // validate for confirm password field
  if (type === "password" && id === "confirmPassword") {
    validate.validate = (value) =>
      value === getValues().password || "Password needs to match!";
  }

  if (textArea)
    return (
      <div className="flex flex-col gap-3">
        {label && (
          <label
            htmlFor={id}
            className="font-[600] text-[0,9rem] sm:text-[1.2rem]"
          >
            {label} {required && "*"}
          </label>
        )}
        <textarea
          placeholder={placeholder}
          {...props}
          type={type}
          id={id}
          disabled={disabled}
          className={`outline-none border-2 px-4 py-2 rounded-md  bg-transparent disabled:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed ${
            error && "border-red-500"
          } ${
            !error && " border-gray-300 text-[1.1rem] focus:border-primary-500"
          } ${className}`}
          {...register(id, validate)}
        />

        <span className="text-[0.8rem] sm:text-[0.8rem] -mt-2 text-red-500">
          {error && error} &nbsp;
        </span>
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label
          htmlFor={id}
          className="font-[600] text-[1rem] sm:text-[1rem] md:text-[1.2rem]"
        >
          {label} {required && "*"}
        </label>
      )}
      <input
        placeholder={placeholder}
        {...props}
        type={type}
        id={id}
        disabled={disabled}
        className={`outline-none border-2 px-4 py-2 rounded-md  bg-transparent disabled:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed ${
          error && "border-red-500"
        } ${
          !error && " border-gray-300 text-[1.1rem] focus:border-primary-500"
        } ${className}`}
        {...register(id, validate)}
      />

      <span className="text-[0.8rem] sm:text-[0.8rem] -mt-2 text-red-500">
        {error && error} &nbsp;
      </span>
    </div>
  );
};

export default Input;
