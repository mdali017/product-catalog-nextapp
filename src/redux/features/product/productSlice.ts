import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProdut: (state) => {
      console.log(state);
    },
    searchTern: (state) =>{
        console.log(state)
    }
  },
});

export const { addProdut } = productSlice.actions;

export default productSlice.reducer;
