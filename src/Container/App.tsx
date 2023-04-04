import React from 'react';
import { Header, Footer } from '../Components/Layout';
import { useEffect,useState } from 'react';
import { menuItemModel, userModel } from '../Interfaces';
import {AccessDenied, AuthenticationTest, AuthenticationTestAdmin, Home, Login, MenuItemList, MenuItemUpsert, MenuItemsDetails, MyOrders, NotFound, OrderConfirmed, OrderDetails, Payment, Register, ShoppingCart} from '../Pages';
import {Route, Routes} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useGetShoppingCartQuery } from '../Apis/shoppingCartApi';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';
import jwtDecode from 'jwt-decode';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { RootState } from '../Storage/Redux/store';
import {AllOrders} from '../Pages';



function App() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

const dispatch = useDispatch();

const {data,isLoading} = useGetShoppingCartQuery(userData.id);

useEffect(() => {
  if(!isLoading)
  {
    //console.log(data.result?.cartItems);
    dispatch(setShoppingCart(data.result?.cartItems));
  }
},[data]);

useEffect(() => {
  const localStorageItem : any = localStorage.getItem("token");

  console.log("RENDER IN APP.TSX")
  if(localStorageItem)
  {
    const {id,fullName,role,email} :userModel= jwtDecode(localStorageItem);
    dispatch(setLoggedInUser({id,fullName,role,email}));
  }

},[])

  return (
    <div className="App">
      <Header/>
      <div className='pb-5 '>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/shoppingcart' element={<ShoppingCart/>}></Route>
        <Route path='/menuItemDetails/:menuItemId' element={<MenuItemsDetails/>}></Route>
        <Route path='/authentication' element={<AuthenticationTest/>}></Route>
        <Route path='/authorization' element={<AuthenticationTestAdmin/>}></Route>
        <Route path='/accessDenied' element={<AccessDenied/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path='/order/orderConfirmed/:id' element={<OrderConfirmed/>}></Route>
        <Route path='/order/myOrders/' element={<MyOrders/>}></Route>
        <Route path='/order/orderDetails/:id' element={<OrderDetails/>}></Route>
        <Route path='/order/allorders' element={<AllOrders/>}></Route>
        <Route path='/menuItem/menuItemList' element={<MenuItemList/>}></Route>
        <Route path='/menuItem/menuItemUpsert/:id' element={<MenuItemUpsert/>}></Route>
        <Route path='/menuItem/menuItemUpsert/' element={<MenuItemUpsert/>}></Route>

        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
