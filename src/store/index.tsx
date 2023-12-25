import { combineReducers, configureStore } from "@reduxjs/toolkit"
import loadingReducer from "./reducer/loading"

const rootReducer = combineReducers({
  loading: loadingReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
