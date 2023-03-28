import React from "react";
import { useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { menuItemModel } from "../Interfaces";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateShoppingCartMutation } from "../Apis/shoppingCartApi";
import { MainLoader, MiniLoader } from "../Components/Page/Common";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";

// USER ID a1b745e5-6cdd-4cbf-9527-40a435b86360

function MenuItemsDetails() {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  //const updateShoppingCart = useUpdateShoppingCartMutation()[0];
  const [updateShoppingCart] = useUpdateShoppingCartMutation(); // this hook returns array [destructurizing array in brackets]
// JUST A CHECKER IF THERE IS VALUE IN STORE 
  //const menuItems = useSelector((state:RootState) => state.menuItemStore.menuItem); // test

  const handleAddToCart = async (menuItemId: number) => {
    setIsAddingToCart(true);
    const response = await updateShoppingCart({
      menuItemId,
      updateQuantityBy: quantity,
      userId: "a1b745e5-6cdd-4cbf-9527-40a435b86360"
    });
    console.log("Response down below");
    console.log(response);

    setIsAddingToCart(false);
  };

  if (isLoading) {
    return <MainLoader/>;
  }
  const menuItem: menuItemModel = data.result;

  const handleQuantity = (num: number) => {
    let newQuantity = quantity + num;
    
    if (newQuantity < 1) {
      setQuantity(1);
    } else {
      setQuantity(newQuantity);
    }
    return;
  };

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">{menuItem?.name}</h2>
          <span>
            <span
              className="badge text-bg-dark pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {menuItem?.category}
            </span>
          </span>
          <span>
            <span
              className="badge text-bg-light pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {menuItem.specialTag && menuItem.specialTag}
            </span>
          </span>
          <p style={{ fontSize: "20px" }} className="pt-2">
            {menuItem.description}
          </p>
          <span className="h3">${menuItem?.price}</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2  p-3"
            style={{ border: "1px solid #333", borderRadius: "30px" }}
          >
            <i
              onClick={() => handleQuantity(-1)}
              className="bi bi-dash p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
            <span className="h3 mt-3 px-3">{quantity}</span>
            <i
              onClick={() => handleQuantity(+1)}
              className="bi bi-plus p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              {isAddingToCart ? (<button disabled className="btn btn-success form-control"><MiniLoader/></button>):(<button className="btn btn-success form-control" onClick={() => handleAddToCart(menuItem?.id)}>
                Add to Cart
              </button>)}
              
            </div>

            <div className="col-5 ">
              <button
                className="btn btn-secondary form-control"
                onClick={() => navigate(-1)}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <div className="col-5">
          <img
            src={menuItem?.image}
            width="100%"
            style={{ borderRadius: "50%" }}
            alt="No content"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default MenuItemsDetails;
