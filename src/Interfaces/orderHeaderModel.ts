import { SD_Status } from "../Utility/SD";
import orderDetailModel from "./orderDetailModel";

export interface orderHeaderModel {
  orderHeaderId?: number;
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupEmail?: string;
  applicationUserId?: string;
  user?: string;
  orderTotal?: number;
  orderDate?: Date;
  stripePaymentIntentId?: string;
  status?: SD_Status;
  totalItems?: number;
  orderDetails?: orderDetailModel[];
}
