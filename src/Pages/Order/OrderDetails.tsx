import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery } from '../../Apis/orderApi';
import { OrderSummary } from '../../Components/Page/Order';

function OrderDetails() {
    const {id} = useParams();
    const {isLoading,data} = useGetOrderDetailsQuery(id);
    let userInput, orderDetails;

    if(!isLoading && data?.result)
    {
        console.log(data);
        userInput = {
            name: data.result[0].pickupName,
            email: data.result[0].pickupEmail,
            phoneNumber: data.result[0].pickupPhoneNumber,
        };
        orderDetails = 
        {
            id: data.result[0].orderHeaderId,
            cartTotal: data.result[0].orderTotal,
            cartItems: data.result[0].orderDetails,
            status: data.result[0].status,
        };
    }

  return (
    <div className='container my-5 mx-auto p-5 w-100' style={{maxWidth:"750px"}}>
        {!isLoading && orderDetails && userInput && (<OrderSummary data = {orderDetails} userInput={userInput}/>) }
    </div>
  )
}

export default OrderDetails