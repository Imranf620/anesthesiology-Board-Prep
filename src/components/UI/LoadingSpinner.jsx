const LoadingSpinner = ({
  width = "48px",
  height = "48px",
  border = "5px",
  color = "rgb(25, 56, 50)",
}) => {
  return (
    <div className="flex items-center justify-center">
      <span
        style={{ width, height, borderWidth: border, borderColor: color }}
        className={`loader `}
      ></span>
    </div>
  );
};

export default LoadingSpinner;
