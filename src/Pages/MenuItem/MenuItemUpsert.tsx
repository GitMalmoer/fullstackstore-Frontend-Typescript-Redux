import React, { useState, useEffect } from "react";
import { apiResponse, menuItemModel } from "../../Interfaces";
import { inputHelper, toastNotify } from "../../Helper";
import { error } from "console";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "../../Apis/menuItemApi";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { SD_Categories } from "../../Utility/SD";

const categories = [
  SD_Categories.Polishers,
  SD_Categories.Equipment,
  SD_Categories.Files,
  SD_Categories.Cosmetics,
];

const menuItemData = {
  name: "",
  category: categories[0],
  description: "",
  price: "",
  specialTag: "",
};


function MenuItemUpsert() {
  const { id } = useParams();
  const [imageToStore, setImageTostore] = useState<any>();
  const [imageToDisplay, setImageToDispaly] = useState<string>("");
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [loading, setLoading] = useState(false);
  const [createMenuItem] = useCreateMenuItemMutation();
  const navigate = useNavigate();
  const [updateMenuItem] = useUpdateMenuItemMutation();

  const { data } = useGetMenuItemByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data?.result.name,
        category: data?.result.category,
        description: data?.result.description,
        price: data?.result.price,
        specialTag: data?.result.specialTag,
      };
      let newPrice : string = tempData?.price.toString();

      if(newPrice.includes('.'))
      {
        tempData.price = newPrice.replace('.',',')
      }

      setMenuItemInputs(tempData);
      setImageToDispaly(data?.result.image);
    }
  }, [data]);

  function handleMenuItemInput(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageType = file.type.split("/")[1];
      const validImgTypes = ["jpg", "jpeg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imageType;
      });

      if (isImageTypeValid.length === 0) {
        setImageTostore("");
        toastNotify(
          "Wrong Image file type valid types are: jpg, jpeg,png",
          "error"
        );
        e.target.value = ""; // IF IMAGE NOT VALID SET INPUT VALUE TO EMPTY STRING
        return;
      } else if (file.size > 1000 * 1024) {
        setImageTostore("");
        toastNotify("File can not be larger than 1MB", "error");
        e.target.value = ""; // IF IMAGE NOT VALID SET INPUT VALUE TO EMPTY STRING
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageTostore(file);

      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageToDispaly(imageUrl);
        console.log(imageToDisplay);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(menuItemInputs);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description ?? "");
    formData.append("SpecialTag", menuItemInputs.specialTag ?? "");
    formData.append("Category", menuItemInputs.category);
    formData.append("Price", menuItemInputs.price);

    if (imageToStore) {
      formData.append("File", imageToStore);
    }

    if (id) {
      formData.append("Id", id);
      const response: apiResponse = await updateMenuItem({
        data: formData,
        id: id,
      });
      if (response.data?.isSuccess == true) {
        toastNotify("Update successfull!");
        navigate("/menuitem/menuitemlist");
      } else {
        let message = response?.error?.data?.errors
        console.log(response);
        toastNotify("Something went wrong while updating!", "error");
        if(message)
        {
          // this is a bit complicated because response returns array of arrays so we have to put all separate arrays into one
          let arrayObjectValues : string[] = Object.values(message);
          let arrayOfErrors : string[] = [];

          arrayObjectValues.forEach((errors : any) => {
            let oneError : string = errors[0];
            arrayOfErrors.push(oneError);
          } )
        
          arrayOfErrors.forEach((error) => {
            toastNotify(error , "error");
          })
        }
      }
    } else {
      const response: apiResponse = await createMenuItem(formData);
      if (response) {
        navigate("/menuitem/menuitemlist");
        console.log(response);
      }
    }
    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">
        {id ? "Edit Menu Item" : "Create Menu Item"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={menuItemInputs.name}
              onChange={handleMenuItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              rows={10}
              value={menuItemInputs.description}
              onChange={handleMenuItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              value={menuItemInputs.specialTag}
              onChange={handleMenuItemInput}
            />
            <select
              className="form-control mt-3"
              placeholder="Enter Category"
              name="category"
              value={menuItemInputs.category}
              onChange={handleMenuItemInput}
            >
              {categories.map((category,index) => {
                  return <option key={index} value={category}>{category}</option>
              })
              }

            </select>
            <input
              type="text"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={menuItemInputs.price}
              onChange={handleMenuItemInput}
            />
            <input
              type="file"
              className="form-control mt-3"
              onChange={handleFileChange}
            />
            <div className="row">
              <div className="col-md-6">
                {" "}
                <button
                  type="submit"
                  style={{ width: "100%" }}
                  className="btn btn-success mt-5 form-control"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  style={{ width: "100%" }}
                  className="btn btn-secondary mt-5 form-control"
                  onClick={() => navigate(-1)}
                >
                  Back to list
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;
