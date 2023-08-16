import { loadStripe } from "@stripe/stripe-js";
import ChackOutForm from "./ChackOutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../Hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_pyment_token);
const Payment = () => {
  const [cart] = useCart();

  const total = cart.reduce((sum, item) => item.categoryitemId.price + sum, 0);
  const price = parseFloat(total.toFixed(2));
  return (
    <div>
      <div className="text-2xl font-bold text-center text-blue-600 my-8">
        <h1>Payment</h1>
      </div>
      <Elements stripe={stripePromise}>
        <ChackOutForm cart={cart} price={price}></ChackOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
