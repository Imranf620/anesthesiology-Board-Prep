const StatusTag = ({ status }) => {
  return (
    <h4
      className={`w-max py-2 px-3 rounded-md capitalize font-[600] ${
        status === "in progress"
          ? "bg-orange-100 text-orange-600"
          : "bg-primary-200 text-primary-400"
      }`}
    >
      {status}
    </h4>
  );
};

export default StatusTag;
