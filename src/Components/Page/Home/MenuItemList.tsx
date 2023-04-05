import React from "react";
import { useState, useEffect } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Storage/Redux/store";
import { SD_SortTypes } from "../../../Utility/SD";

function MenuItemList() {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z);
  const search = useSelector(
    (state: RootState) => state.menuItemStore.searchValue
  );

  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];

  useEffect(() => {
    if (data && !isLoading) {
      const searchFilter = handleFilters(search, selectedCategory,sortName);
      setMenuItems(searchFilter);
    }
  }, [search]);

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setMenuItem(data.result)); // INITIALIZATION TO STORE
      setMenuItems(data.result);
      console.log("LOADING KUR");

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


  const handleSortClick = (i:number) => {
    setSortName(sortOptions[i]);
    const tempSortedMenuItems = handleFilters(search,selectedCategory,sortOptions[i]);
    setMenuItems(tempSortedMenuItems);

  }

  const handleCategoryClick = (selectedCateg: string) => {
    const buttons: any = document.querySelectorAll(".custom-buttons");
    setSelectedCategory(selectedCateg);

    buttons.forEach((button: HTMLButtonElement) => {
      if (button.textContent === selectedCateg) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });

    console.log("stateitem", selectedCategory);
    console.log("selectedCateg", selectedCateg);
    const filteredByCategory = handleFilters(search, selectedCateg,sortName);
    setMenuItems(filteredByCategory);
  };

  const handleFilters = ( search: string, category: string, sortType:SD_SortTypes) => {
    let tempMenuItems = [...data.result];

    if (search) {
      const tempSearchMenuItems = [...tempMenuItems];
      tempMenuItems = tempSearchMenuItems.filter((menuItem: menuItemModel) =>
        menuItem.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    if (category) {
      const tempCategoryMenuItems = [...tempMenuItems];
      if (category != "All") {
        tempMenuItems = tempCategoryMenuItems.filter(
          (menuItem: menuItemModel) =>
            menuItem.category
              .toLocaleLowerCase()
              .includes(category.toLocaleLowerCase())
        );
      }
    }
    // sort
    if(sortType === SD_SortTypes.PRICE_LOW_HIGH){
      tempMenuItems.sort((a:menuItemModel,b:menuItemModel) => a.price - b.price)
    }

    if(sortType === SD_SortTypes.PRICE_HIGH_LOW){
      tempMenuItems.sort((a:menuItemModel,b:menuItemModel) => b.price - a.price)
    }

    if(sortType === SD_SortTypes.NAME_A_Z){
      tempMenuItems.sort((a:menuItemModel,b:menuItemModel) => a.name.toLocaleUpperCase().charCodeAt(0) - b.name.toLocaleUpperCase().charCodeAt(0))
    }

    if(sortType === SD_SortTypes.NAME_Z_A){
      tempMenuItems.sort((a:menuItemModel,b:menuItemModel) => b.name.toLocaleUpperCase().charCodeAt(0) - a.name.toLocaleUpperCase().charCodeAt(0))
    }

    return tempMenuItems;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <ul className="nav w-100 my-3 d-flex justify-content-center align-items-center">
        {categoryList.map((categoryItem: string, index: number) => {
          return (
            <li className="nav-link" key={index}>
              <button
                className={`custom-buttons p-0 pb-2 fs-5 ${
                  index === 0 && "active"
                }`}
                onClick={() => handleCategoryClick(categoryItem)}
              >
                {categoryItem}
              </button>
            </li>
          );
        })}
        <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
          <div
            className="nav-link dropdown-toggle text-dark fs-6 border"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {sortName}
            <ul className="dropdown-menu">
              {sortOptions.map((sortType, index) => {
                return (
                  <li key={index} className="dropdown-item" onClick={() => handleSortClick(index)}>
                    {sortType}
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      </ul>
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel, index: number) => {
          return <MenuItemCard menuItem={menuItem} key={index}></MenuItemCard>;
        })}
    </div>
  );
}

export default MenuItemList;
