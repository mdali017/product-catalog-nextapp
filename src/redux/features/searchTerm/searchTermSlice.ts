import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchTermState {
  searchTerm: string;
}

const initialState: SearchTermState = {
  searchTerm: "",
};

export const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;