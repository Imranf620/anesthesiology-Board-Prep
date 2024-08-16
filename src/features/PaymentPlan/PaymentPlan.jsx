import Button from '../../components/UI/Button';
import PaymentPlanCard from '../../components/UI/PaymentPlanCard';
import { useGetPaymentPlans } from '../Admin/ManagePaymentPlans/useGetPaymentPlans';
import FullPageLoading from '../../components/UI/FullPageLoading';
import Modal from '../../components/UI/Modal';
import { useState } from 'react';

const PaymentPlan = () => {
  const { paymentPlans, isLoading, isError } = useGetPaymentPlans();
  const [promoCode, setPromoCode] = useState('');

  const activePlans = paymentPlans?.filter(
    plans => plans.isActive.toLowerCase() === 'y',
  );

  const handleChange = e => {
    setPromoCode(e.target.value);
  };

  console.log(activePlans);
  return (
    <>
      {isLoading && <FullPageLoading />}
      {paymentPlans && (
        <section className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activePlans?.map((plan, i) => (
            <PaymentPlanCard key={i}>
              <h4 className="flex items-center justify-center gap-4 text-center text-[1rem] font-[600] text-cyan-600 md:text-[1.3rem]">
                <span className="h-[10px] w-[10px] rounded-full bg-cyan-600"></span>
                <span>{plan.Name}</span>
              </h4>
              <div className="flex justify-center">
                <h2 className="text-[2rem] font-[600] md:text-[3rem]">
                  ${plan.Price}{' '}
                  <span className="text-[1rem] font-[500] text-gray-500">
                    /month
                  </span>
                </h2>
              </div>
              <ul className="flex list-disc flex-col items-center gap-3 px-3 text-[0.9rem] md:text-[1rem]">
                {plan.Description &&
                  plan.Description.split(' \n ').map((itm, i) => (
                    <li key={i}>{itm}</li>
                  ))}
              </ul>
              <Modal>
                <Modal.Open id="promo-code">
                  <Button
                    // link
                    // to={`/payment-plan/${plan.Name}/checkout`}
                    variant={i === 1 ? 'dark' : 'outlined'}
                    className="mt-auto "
                  >
                    Get Plan
                  </Button>
                </Modal.Open>
                <Modal.Window closeOnOverlay id="promo-code">
                  <div className="p-10">
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="promo"
                        className="text-[1.2rem] font-[600] text-primary-400"
                      >
                        Enter promotion code
                      </label>
                      <input
                        className="rounded-lg border-2 border-primary-500 px-4 py-2 outline-none"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button
                        link
                        to={`/payment-plan/${plan.Name}/checkout${promoCode ? `?promo-code=${promoCode}` : ''}`}
                        variant={'dark'}
                        className="mt-auto "
                      >
                        Checkout
                      </Button>
                    </div>
                  </div>
                </Modal.Window>
              </Modal>
            </PaymentPlanCard>
          ))}
        </section>
      )}
    </>
  );
};

export default PaymentPlan;
