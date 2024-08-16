import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";

const Button = ({
  children,
  className = "",
  variant = "primary",
  link = false,
  to,
  isLoading,
  disabled,
  onClick,
  ...props
}) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const variantType = {
    outlined:
      "border-[2px] border-primary-300 hover:bg-primary-400 hover:text-white px-4 py-2 rounded-md",
    underline:
      "border-b-[2px] border-primary-500 hover:bg-primary-400 hover:text-white px-3 py-2 transition-all rounded-sm",
    primary: "bg-primary-200 py-2 px-8 rounded-md font-[500] text-[1.2rem]",
    dark: "bg-primary-400 border-2 border-primary-500 text-white py-2 px-4 rounded-md font-[500] text-[1rem] hover:bg-primary-400/90 transition-all",
    delete: "rounded-md px-5 py-1 text-red-500 hover:bg-red-50",
  };
  if (link)
    return (
      <Link
        to={to}
        className={`text-center hover:-translate-y-[1px] hover:shadow-lg active:-translate-y-0 active:shadow-md ${variantType[variant]} ${className}`}
      >
        {children}
      </Link>
    );

  return (
    <button
      {...props}
      disabled={disabled}
      className={`relative overflow-hidden disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-400 ${variantType[variant]} ${className}`}
      onClick={(e) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ""
      )}

      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <LoadingSpinner
            width="20px"
            height="20px"
            border="3px"
            color="white"
          />
          <span>{children}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
