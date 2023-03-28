import React from 'react';
import { Header, Footer } from '../Components/Layout';
import { useEffect,useState } from 'react';
import { menuItemModel } from '../Interfaces';
import {Home, Login, MenuItemsDetails, NotFound, Register, ShoppingCart} from '../Pages';
import {Route, Routes} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useGetShoppingCartQuery } from '../Apis/shoppingCartApi';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';

function App() {
const dispatch = useDispatch();

const {data,isLoading} = useGetShoppingCartQuery("a1b745e5-6cdd-4cbf-9527-40a435b86360");

useEffect(() => {
  if(!isLoading)
  {
    console.log(data.result?.cartItems);
    dispatch(setShoppingCart(data.result?.cartItems));
  }
},[data]);

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
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
