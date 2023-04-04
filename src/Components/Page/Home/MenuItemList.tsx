import React from "react";
import { useState, useEffect } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Storage/Redux/store";

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const search = useSelector(
    (state: RootState) => state.menuItemStore.searchValue
  );

  useEffect(() => {
    if (data && !isLoading) {
      const tempMenuItems = data.result.filter((menuItem: menuItemModel) =>
        menuItem.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      setMenuItems(tempMenuItems);
    }

    if (data && !isLoading && !search) {
      console.log("search empty");
      setMenuItems(data.result);
    }
  }, [search]);

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setMenuItem(data.result)); // INITIALIZATION TO STORE
      setMenuItems(data.result);

      // populating categories
      const arrayOfCategories: string[] = ["All"];
      data.result.forEach((menuItem: menuItemModel) => {
        // if arrayOfCattegories does not have menuitem.category then push category to array
        if (arrayOfCategories.indexOf(menuItem.category) === -1) {
          arrayOfCategories.push(menuItem.category);
        }
      });
      setCategoryList(arrayOfCategories); // set local state
    }
  }, [isLoading]);

  const handleCategoryClick = (selectedCategory : string) => {
    const buttons : any = document.querySelectorAll(".custom-buttons");

    buttons.forEach((button : HTMLButtonElement) => {
      if(button.textContent === selectedCategory)
      {
        button.classList.add("active");
        setSelectedCategory(selectedCategory);
      }
      else
      {
        button.classList.remove("active");
      }
    })
  }

  const handleFilters = () => {
    
  }

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="nav w-100 my-3 d-flex justify-content-center align-items-center">
        {categoryList.map((categoryItem: string, index: number) => {
          return (
            <li className="nav-link" key={index}>
              <button className={`custom-buttons p-0 pb-2 fs-5 ${index === 0 && "active"}`} onClick={() => handleCategoryClick(categoryItem)}>{categoryItem}</button>
            </li>
          );
        })}
      </div>
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel, index: number) => {
          return <MenuItemCard menuItem={menuItem} key={index}></MenuItemCard>;
        })}
    </div>
  );
}

export default MenuItemList;
