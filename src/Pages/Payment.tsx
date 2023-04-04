import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../Components/Page/Payment";
import { OrderSummary } from "../Components/Page/Order";
import OrderSummaryProps from "../Components/Page/Order/OrderSummaryProps";

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();



  const stripePromise = loadStripe(
    "pk_test_51Mok3vJnc4zRNwWk5sc4K8wYLmuUfQ0BBRpJMrPMbPb7qy6xlD8eWB9oE0BqgowzFYlXKxQQvuawi1kOk45Wlowb00oHauQghc"
  );

  const options = {
    // passing the client secret obtained from the server
    clientSecret: `${apiResult.clientSecret}`,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="container m-5 p-5">
        <div className="row">
          <div className="col-md-7">
            <OrderSummary data = {apiResult} userInput = {userInput}  />
          </div>
          <div className="col-md-4 offset-md-1">
            <h3 className="text-success">Payment</h3>
            <CheckoutForm data = {apiResult} userInput = {userInput}  />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
