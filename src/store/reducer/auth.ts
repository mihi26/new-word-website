import { createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."


const initialState = {
  isAuthenticated: Boolean(JSON.parse(localStorage.getItem("@token") || '""')),
  userInfo: JSON.parse(localStorage.getItem("@user") || '""'),
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserCredentials: (state, action) => {
      localStorage.setItem("@token", JSON.stringify(action.payload.accessToken))
      localStorage.setItem("@user", JSON.stringify(action.payload.userInfo))
      state.isAuthenticated = true
      state.userInfo = action.payload.userInfo
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    logOut: (state) => {
      localStorage.removeItem("@token")
      localStorage.removeItem("@user")
      state.isAuthenticated = false
    },
  },
})

export const { saveUserCredentials, logOut, setUserInfo } = authSlice.actions
export const selectAuth = (state: RootState) => state["auth"]
export default authSlice.reducer
