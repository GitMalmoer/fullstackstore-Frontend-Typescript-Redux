import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../../Apis/orderApi";
import { toastNotify } from "../../../Helper";
import { apiResponse, cartItemModel } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";
import OrderSummaryProps from "../Order/OrderSummaryProps";

const CheckoutForm = ({ data, userInput }: OrderSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { email, phoneNumber, name } = userInput;
  const { cartTotal, cartItems } = data;
  const navigate = useNavigate();

  console.log("data", data);
  console.log("userinput", userInput);
  const [createOrder] = useCreateOrderMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      toastNotify("An unexpected error occured.", "error");
      console.log(result.error.message);
      setIsProcessing(false);
    } else {
      console.log(result);
      let grandTotal = 0;
      let totalItems = 0;

      const orderDetailsDTO: any = [];
      cartItems.forEach((item: cartItemModel) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["menuItemId"] = item.menuItem?.id;
        tempOrderDetail["quantity"] = item.quantity;
        tempOrderDetail["itemName"] = item.menuItem?.name;
        tempOrderDetail["price"] = item.menuItem?.price;
        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItems += item.quantity!;

        orderDetailsDTO.push(tempOrderDetail);
      });

      const response: apiResponse = await createOrder({
        pickupName: name,
        pickupPhoneNumber: phoneNumber,
        pickupEmail: email,
        totalItems: totalItems,
        orderDetailsDTO: orderDetailsDTO, // DETAILS DTO CREATED ABOVE
        orderTotal: grandTotal,
        applicationUserId: data?.userId,
        stripePaymentIntentId: data?.stripePaymentIntentId,
        status:
          result.paymentIntent.status === "succeeded"
            ? SD_Status.CONFIRMED
            : SD_Status.PENDING,
      });

      console.log(response);
      if (response.data?.result.status === SD_Status.CONFIRMED) {
        navigate(`/order/orderconfirmed/${response.data.result.orderHeaderId}`);
      } else {
        navigate(`/failed`);
      }
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success w-100 mt-5" disabled={!stripe || isProcessing}>
        <span className="btn-text">{isProcessing ? "Processing..." : "Submit Order"}</span>
      </button>
    </form>
  );
};

export default CheckoutForm;
