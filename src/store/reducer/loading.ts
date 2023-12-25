import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface ILoadingState {
  isLoading: boolean,
}

const initialState: ILoadingState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export const selectLoading = (state: RootState) => state['loading']
export default loadingSlice.reducer;
