import Button from '../../components/UI/Button';
import Heading from '../../components/UI/Heading';
import { useGetProfile } from '../../features/Authentication/useGetProfile';
import PaymentPlan from '../../features/PaymentPlan/PaymentPlan';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const PaymentPlanPage = () => {
  const { profile } = useGetProfile();

  return (
    <>
      <main className="mx-auto max-w-[1300px] px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <Heading>Choose your plan</Heading>
            <h4 className="mt-4  text-gray-500">
              Get the right plan for youself. Plans can be <br /> upgraded in
              future.
            </h4>
          </div>
          <Button variant="underline" link to="/">
            {profile ? 'Home' : 'Login'}
          </Button>
        </div>
        <PaymentPlan />
      </main>
    </>
  );
};

export default PaymentPlanPage;
