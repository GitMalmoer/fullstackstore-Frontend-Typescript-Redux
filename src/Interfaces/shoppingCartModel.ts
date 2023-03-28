import cartItemModel from "./cartItemModel";

export interface shoppingCartModel {
    id?: number;
    userId?: string;
    cartItems?:cartItemModel [];
    stripePaymentIntentId?: any;
    clientSecret?: any;
    cartTotal?: number;
  }
  