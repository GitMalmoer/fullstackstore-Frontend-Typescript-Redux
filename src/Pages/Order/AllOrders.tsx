import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { orderHeaderModel } from "../../Interfaces/orderHeaderModel";
import { withAuth } from "../../HOC";
import OrderList from "../../Components/Page/Order/OrderList";
import withAdminAuth from "../../HOC/withAdminAuth";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");
  
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

export default withAdminAuth(AllOrders);
