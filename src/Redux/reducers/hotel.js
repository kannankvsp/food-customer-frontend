import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    value: {
      cateringservicename: "",
      username: "",
      email: "",
      picture: "",
      mobile: "",
      address: ""
    }
  },
  reducers: {
    getHotelData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { getHotelData } = hotelSlice.actions;

export default hotelSlice.reducer;
