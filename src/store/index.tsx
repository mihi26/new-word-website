import { combineReducers, configureStore } from "@reduxjs/toolkit"
import loadingReducer from "./reducer/loading"
import authReducer from "./reducer/auth"
import wordReducer from "./reducer/word"

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  words: wordReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
