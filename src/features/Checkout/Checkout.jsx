import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useClientSecret } from "./useClientSecret";
import FullPageLoading from "../../components/UI/FullPageLoading";

const Checkout = ({ stripePromise }) => {
  const { clientSecret, isLoading } = useClientSecret();

  if (isLoading) return <FullPageLoading />;

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
