import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import Button from "../../components/UI/Button";
import { toast } from "react-toastify";
import Heading from "../../components/UI/Heading";
import { useState } from "react";

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${location.origin}/login`,
      },
    });
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toast.error(result.error.message, { autoClose: 10000 });
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      toast.success("Successfully subscribed!");
    }
    setIsProcessing(false);
  };

  return (
    <form
      className="mx-auto mt-10 flex min-h-[400px] w-[500px] flex-col gap-6 bg-white px-5 py-6"
      onSubmit={handleSubmit}
    >
      <Heading className="mb-4">Checkout</Heading>
      <PaymentElement />
      <Button
        variant="dark"
        disabled={!stripe || isProcessing}
        isLoading={isProcessing}
        className="mt-auto"
      >
        {isProcessing ? "Processing..." : "Submit"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
