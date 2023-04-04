import React, { useEffect, useState } from "react";
import { apiResponse, cartItemModel } from "../../../Interfaces";
import OrderSummaryProps from "./OrderSummaryProps";
import { getStatusColor } from "../../../Helper";
import { useNavigate } from "react-router-dom";
import { SD_Roles, SD_Status } from "../../../Utility/SD";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useUpdateOrderHeaderMutation } from "../../../Apis/orderApi";
import { MainLoader } from "../Common";

function OrderSummary({ data, userInput }: OrderSummaryProps) {
  const { email, phoneNumber, name } = userInput;
  const { cartTotal, cartItems } = data;
  const navigate = useNavigate();
  const badgeTypeColor = getStatusColor(data.status!);
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const [updateOrderHeader] = useUpdateOrderHeaderMutation();
  const [isCanceled, setCancelFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setting cancel flag on render this sets the cancel/uncancel button
    if (data.status! === SD_Status.CANCELLED) {
      setCancelFlag(true);
    } else {
      setCancelFlag(false);
    }
  }, []);

  const nextStatus: any =
    data.status! === SD_Status.CONFIRMED
      ? { color: "info", value: SD_Status.BEIGN_COOKED }
      : data.status! === SD_Status.BEIGN_COOKED
      ? { color: "warning", value: SD_Status.READY_FOR_PICKUP }
      : data.status! === SD_Status.READY_FOR_PICKUP
      ? { color: "success", value: SD_Status.COMPLETED }
      : data.status! === SD_Status.COMPLETED && {
          color: "info",
          value: SD_Status.CONFIRMED,
        };

  const handleNextStatus = async () => {
    setIsLoading(true);
    const response: apiResponse = await updateOrderHeader({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });
    setIsLoading(false);
  };

  const handleCancel = async () => {
    setIsLoading(true);
    if (data.status! === SD_Status.CANCELLED) {
      // uncancel
      await updateOrderHeader({
        orderHeaderId: data.id,
        status: SD_Status.CONFIRMED,
      });
      setCancelFlag(false);
    } else {
      const response: apiResponse = await updateOrderHeader({
        orderHeaderId: data.id,
        status: SD_Status.CANCELLED,
      });
      setCancelFlag(true);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {" "}
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
            <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
              {data.status!}
            </span>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">Name : {name} </div>
            <div className="border py-3 px-2">Email : {email} </div>
            <div className="border py-3 px-2">Phone : {phoneNumber} </div>
            <div className="border py-3 px-2">
              <h4 className="text-success">Menu Items</h4>
              <div className="p-3">
                {cartItems &&
                  cartItems.map((cartItem: cartItemModel, Index) => {
                    return (
                      <div key={Index} className="d-flex">
                        <div className="d-flex w-100 justify-content-between">
                          <p>{cartItem.menuItem?.name}</p>
                          <p>
                            ${cartItem.menuItem?.price} x {cartItem.quantity} =
                          </p>
                        </div>
                        <p style={{ width: "70px", textAlign: "right" }}>
                          $
                          {(
                            (cartItem.menuItem?.price ?? 0) *
                            (cartItem.quantity ?? 0)
                          ).toFixed(2)}
                        </p>
                      </div>
                    );
                  })}

                <hr />
                <h4 className="text-danger" style={{ textAlign: "right" }}>
                  ${cartTotal.toFixed(2)}
                </h4>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Go back to orders
            </button>

            {userData.role == SD_Roles.ADMIN && (
              <div className="d-flex">
                <button
                  className={`btn btn-${
                    isCanceled ? "success" : "danger"
                  } mx-1`}
                  disabled={isLoading}
                  onClick={handleCancel}
                >
                  {isCanceled ? "Uncancel" : "Cancel"}
                </button>
                <button
                  className={`btn btn-${nextStatus.color}`}
                  disabled={isLoading}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
