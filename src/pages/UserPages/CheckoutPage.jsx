import { useNavigate, useParams } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import Checkout from "../../features/Checkout/Checkout";
import { useGetProfile } from "../../features/Authentication/useGetProfile";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutPage = () => {
  const { profile } = useGetProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) navigate("/login");
  }, [profile]);

  return <Checkout stripePromise={stripePromise} />;
};

export default CheckoutPage;
