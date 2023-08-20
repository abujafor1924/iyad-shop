import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAxiuseSecure from "../../../Hooks/useAxiuseSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-hot-toast";

interface ChackOutFormProps {
  price: number; // Specify the correct type here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cart: any[]; // Or provide a type for 'cart' if possible
}
const ChackOutForm: React.FC<ChackOutFormProps> = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cardError, setCardError] = useState("");
  const [axiosSecure] = useAxiuseSecure();
  const [cliendSecret, setClineSecret] = useState("");
  const [procesing, setProcessing] = useState(false);
  const [transectionId, setTransectionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data?.clientSecret);
        setClineSecret(res.data?.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setCardError(
        error.message || "An error occurred while processing your payment."
      );
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(cliendSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log("payment intent", paymentIntent);

    setProcessing(false);
    if (paymentIntent && paymentIntent.status === "succeeded") {
      setTransectionId(paymentIntent.id);
      // save payment info server
      const payment = {
        email: user?.email,
        transectionId: paymentIntent.id,
        price,
        quantity: cart.length,
        date: new Date(),
        itemes: cart.map((item) => item._id),
        status: "survice pending",
        itemeName: cart.map((item) => item.categoryitemId.name),
        itemeOrderId: cart.map((item) => item.categoryitemId.orderId),
      };
      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.result.insertedId) {
          toast.success("Remove Cart Product");
        }
      });
    }
  };
  return (
    <>
      <form className="w-3/12 mx-auto py-8 " onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary my-4"
          type="submit"
          disabled={!stripe || !cliendSecret || procesing}
        >
          Pay
        </button>
      </form>

      {cardError && (
        <p className="text-red-700 text-center pb-8">{cardError}</p>
      )}
      {transectionId && (
        <p className="text-green-700 text-center pb-8">
          {" "}
          Transection Succesed : {transectionId}
        </p>
      )}
    </>
  );
};

export default ChackOutForm;
