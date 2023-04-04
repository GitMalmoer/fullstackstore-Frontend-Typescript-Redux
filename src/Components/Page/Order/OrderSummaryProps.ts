import { cartItemModel } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";

export default interface OrderSummaryProps {
  data: {
    id:number,
    cartTotal: number;
    cartItems: any[];
    stripePaymentIntentId?:string;
    userId?:string;
    status: SD_Status;
  };
  userInput: {
    email: string;
    name: string;
    phoneNumber: number;
  };
}
