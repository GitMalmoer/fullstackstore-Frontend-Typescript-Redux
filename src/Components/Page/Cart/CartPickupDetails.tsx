import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inputHelper } from "../../../Helper";
import { cartItemModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { MiniLoader } from "../Common";

function CartPickupDetails() {
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const [isLoading, setLoading] = useState(false);

  const userData = useSelector((state:RootState) => state.userAuthStore);

  let grandTotal: number = 0;
  let totalItems = 0;

  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: "",
  };

  shoppingCartFromStore.map((cartItem: cartItemModel) => {
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    totalItems += cartItem.quantity ?? 0;
    return null;
  });

  const [userInput, setUserInput] = useState(initialUserData);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form className="col-10 mx-auto" onSubmit={handleSumbit}>
        <div className="form-group mt-3">
          Pickup Name
          <input
            value={userInput.name}
            onChange={handleUserInput}
            type="text"
            className="form-control"
            placeholder="name..."
            name="name"
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            value={userInput.email}
            onChange={handleUserInput}
            type="email"
            className="form-control"
            placeholder="email..."
            name="email"
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            value={userInput.phoneNumber}
            onChange={handleUserInput}
            type="number"
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>
        <button
          disabled = {isLoading}
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
        >
          {isLoading ? <MiniLoader/> : "Looks Good? Place Order!"}
        </button>
      </form>
    </div>
  );
}

export default CartPickupDetails;
