import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from ".."
import { setLoading } from "./loading"
import ApiClientWithToken from "../../api/api"
interface IBookState {
  words: [],
  textToSpeechWord: ''
}

const initialState: IBookState = {
  words: [],
  textToSpeechWord: ''
}

export const getNewWords = createAsyncThunk(
  "words/getWords",
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(true))
    try {
      const res = await ApiClientWithToken.get("word")
      return res
    } catch (error) {
      return rejectWithValue(error)
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getNewWords.fulfilled, (state, { payload }) => {
      state.words = payload.data
      payload.data.forEach(item => {
        state.textToSpeechWord += `${item.word}. ${item.definition.map(def => `Definition: ${def.meaning}`).join('. ')}. Example: ${item.example}. `
      })
    })
  },
})
export const selectWords = (state: RootState) => state["words"]
export default wordSlice.reducer
