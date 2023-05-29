import React, { useEffect } from "react";
import { useDeleteMenuItemMutation, useGetMenuItemsQuery } from "../../Apis/menuItemApi";
import { apiResponse, menuItemModel } from "../../Interfaces";
import { MainLoader } from "../../Components/Page/Common";
import { useNavigate } from "react-router-dom";
import { toastNotify } from "../../Helper";
import { toast } from "react-toastify";

function MenuItemList() {
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const navigate = useNavigate();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  const handleDelete = async (id : number) => {
    // const response : apiResponse = await deleteMenuItem(id); 
    // console.log(response);
    // if(response.data?.isSuccess == true){
    //   toastNotify("Item deleted successfully");
    // }
    
    toast.promise(
      deleteMenuItem(id),
      {
        pending: 'Promise is pending',
        success: 'Menu item deleted successfully 👌',
        error: 'Menu item not deleted 🤯'
      },
      {
        theme:"dark",
      }
    );
   }

  return (
    <div className="table p-md-5 ">
      {isLoading && <MainLoader/>}
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-success">MenuItem List</h1>
        <button className="btn btn-success" onClick={() =>navigate("/menuitem/menuitemupsert/")} >Add New Menu Item</button>
      </div>
      <div className="p-2">
        <div className="row border">
          <div className="col-3 col-md-2">Image</div>
          <div className="d-none d-md-block col-md-1 ">ID</div>
          <div className="col-3 col-md-2">Name</div>
          <div className="col-md-2 d-none d-md-block">Category</div>
          <div className="col-3 col-md-1">Price</div>
          <div className="col-md-2 d-none d-md-block ">Special Tag</div>
          <div className="col-3 col-md-1">Action</div>
        </div>

        {data &&
          !isLoading &&
          data?.result.map((menuItem: menuItemModel, index: number) => {
            return (
                <div className="row border" key={index}>
                  <div className="col-3 col-md-2">
                    <img
                      src={menuItem?.image}
                      alt={menuItem?.name}
                      style={{ width: "100%", maxWidth: "120px" }}
                    />
                  </div>
                  <div className="col-md-1 d-none d-md-block">{menuItem?.id}</div>
                  <div className="col-3 col-md-2">{menuItem?.name}</div>
                  <div className="col-md-2 d-none d-md-block">{menuItem?.category}</div>
                  <div className="col-3 col-md-1">{menuItem?.price}</div>
                  <div className="col-md-2 d-none d-md-block">{menuItem?.specialTag}</div>
                  <div className="col-3 col-md-1 d-flex">
                    <div>
                    <button className="btn btn-success" onClick={() =>navigate("/menuitem/menuitemupsert/"+menuItem.id)}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    </div>
                    <div>
                    <button className="btn btn-danger mx-2" onClick={() => handleDelete(menuItem.id)}>
                      <i className="bi bi-trash-fill"></i>
                    </button>
                    </div>
                  </div>
                </div>
            );
          })}
      </div>
    </div>
  );
}

export default MenuItemList;
