import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import PaymentPlansTable from "./PaymentPlansTable";
import { useGetPaymentPlans } from "./useGetPaymentPlans";

const PaymentPlans = () => {
  const { paymentPlans, isLoading, isError } = useGetPaymentPlans();

  return (
    <section className="w-full mt-5">
      <div className="rounded-lg bg-white px-5 py-10 shadow-lg">
        <h2 className="mb-4 text-[1.1rem] font-[600] uppercase tracking-wider sm:text-[1.5rem]">
          Payment Plans
        </h2>
        {!paymentPlans && isLoading && (
          <div className="my-8 flex justify-center">
            <LoadingSpinner border="5px" width="40px" height="40px" />
          </div>
        )}
        {/* Paymen plans table */}
        <div className="overflow-hidden">
          {paymentPlans && !isLoading && (
            <PaymentPlansTable paymentPlans={paymentPlans} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentPlans;
