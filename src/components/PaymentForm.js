import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      setPaymentError(result.error.message);
      setPaymentSuccess(null);
    } else {
      // Send the payment method ID to your server for backend processing
      const response = await axios.post("/api/charge", {
        paymentMethodId: result.paymentMethod.id,
      });

      if (response.data.success) {
        setPaymentSuccess("Payment successful!");
        setPaymentError(null);
      } else {
        setPaymentError("Payment failed. Please try again.");
        setPaymentSuccess(null);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="payment-form">
      <div className="product">
        <img src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress"     
              style={{ width: "100%", height: "auto" }}></img>
              </div>
              <div className="headings">
        <h3>Enter Card Details</h3>  </div>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>    
        {paymentError && <p className="error-message">{paymentError}</p>}
        {paymentSuccess && <p className="success-message">{paymentSuccess}</p>}
      </div>

    </form>
  );
};

export default PaymentForm;
