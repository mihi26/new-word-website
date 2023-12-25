import { combineReducers, configureStore } from "@reduxjs/toolkit"
import loadingReducer from "./reducer/loading"
import authReducer from "./reducer/auth"

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
