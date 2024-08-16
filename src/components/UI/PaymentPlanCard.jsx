const PaymentPlanCard = ({ children, className = "" }) => {
  return (
    <div
      className={`h-[500px] p-7 shadow-md bg-white rounded-2xl flex flex-col gap-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default PaymentPlanCard;
