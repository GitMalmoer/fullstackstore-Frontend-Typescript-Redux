import React from "react";
import { useState, useEffect } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery, } from "../../../Apis/menuItemApi";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../Common";

function MenuItemList() {
  //const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const dispatch = useDispatch();
  const {data,isLoading} = useGetMenuItemsQuery(null);

  useEffect(() => {
    if(!isLoading)
    {
      //console.log(data.result);
      dispatch(setMenuItem(data.result));
    }
  }, [isLoading]);

  if(isLoading)
  {
    return <MainLoader/>;
  }

  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem : menuItemModel, index : number) => {
          return <MenuItemCard menuItem={menuItem} key={index}></MenuItemCard>;
        })}
    </div>
  );
}

export default MenuItemList;
