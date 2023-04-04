import React from 'react'
import { MainLoader } from '../Common';
import { orderHeaderModel } from '../../../Interfaces/orderHeaderModel';
import OrderListProps from './OrderListType';
import { useNavigate } from 'react-router-dom';
import { getStatusColor } from '../../../Helper';
import { SD_Status } from '../../../Utility/SD';

function OrderList({isLoading,orders} : OrderListProps) {
    const navigate = useNavigate();
  return (
    <div className="table p-5">
        {isLoading && <MainLoader />}
        {!isLoading && (
          <>
            <h1 className="text-success">Orders List</h1>
            <div className="p-2">
              <div className="row border">
                <div className="col-1">ID</div>
                <div className="col-2">Name</div>
                <div className="col-2">Phone</div>
                <div className="col-1">Total</div>
                <div className="col-1">Items</div>
                <div className="col-2">Date</div>
                <div className="col-2">Status</div>
                <div className="col-1">Go to Details</div>
              </div>
              {orders?.map((order: orderHeaderModel, index: number) => {
                const statusColor : any = getStatusColor(order.status!);
                console.log(order);
                return (
                  <div className="row border" key={index}>
                    <div className="col-1">{order.orderHeaderId}</div>
                    <div className="col-2">{order.pickupName}</div>
                    <div className="col-2">{order.pickupPhoneNumber}</div>
                    <div className="col-1">${(order.orderTotal)?.toFixed(2)}</div>
                    <div className="col-1">#{order.totalItems}</div>
                    <div className="col-2">{new Date(order.orderDate!).toLocaleDateString()}</div>
                    <div className="col-2">
                      <span className={`badge bg-${statusColor}`}>{order.status}</span>
                    </div>
                    <div className="col-1">
                      <button
                       className="btn btn-success" onClick={() => {
                        navigate(`/order/orderdetails/${order.orderHeaderId}`)
                       }}>Details</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
  )
}

export default OrderList