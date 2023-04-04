import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuItem: [],
    searchValue: "",
}

export const menuItemSlice = createSlice({
    name: "MenuItem",
    initialState: initialState,
    reducers:{
        setMenuItem: (state,action) => {
            state.menuItem = action.payload;
        },
        setSearchValue: (state,action) => {
            state.searchValue = action.payload;
        }
    }
});

export const {setMenuItem,setSearchValue} = menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer;