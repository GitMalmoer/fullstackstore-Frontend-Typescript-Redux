import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { orderHeaderModel } from "../../Interfaces/orderHeaderModel";
import { withAuth } from "../../HOC";
import OrderList from "../../Components/Page/Order/OrderList";

function MyOrders() {
  const token: any = jwtDecode(localStorage.getItem("token") as string) ?? "";
  const { data, isLoading } = useGetAllOrdersQuery(token.id);
  
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data && data.result && isLoading == false) {
      setOrders(data.result);
    }
  }, [isLoading]);
  return (
    <>
      <OrderList orders = {orders} isLoading={isLoading}/>
    </>
  );
}

export default withAuth(MyOrders);
