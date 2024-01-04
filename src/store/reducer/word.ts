import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from ".."
import { setLoading } from "./loading"
import ApiClientWithToken from "../../api/api"
import { IWord } from "../../types"
import { convertQueryString } from "../../utils"
interface IWordState {
  words: IWord[]
  textToSpeechWord: []
}

const initialState: IWordState = {
  words: [],
  textToSpeechWord: [],
}

export const getNewWords = createAsyncThunk(
  "words/getWords",
  async (payload: any | undefined, { rejectWithValue, dispatch }) => {
    dispatch(setLoading(true))
    try {
      if (payload) {
        const res = await ApiClientWithToken.get(
          `word${convertQueryString(payload)}`
        )
        return res.data
      }
      const res = await ApiClientWithToken.get("word")
      return res.data
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
      const arrayMeaning = []
      payload.data.forEach((item, index) => {
        arrayMeaning.push({key:'en', text: item.word})
        item.definition.map((data, indexDef) => {
          arrayMeaning.push({key: 'en', text: (indexDef === 0 ? 'Definition. ' : '') + data.meaning})
          arrayMeaning.push({key: 'vn', text: data.meaningVN})
        })
        arrayMeaning.push({key:'en', text: 'Example. ' + item.example})
        arrayMeaning.push({key:'en', text: item.exampleVN})
      })
      state.textToSpeechWord = JSON.parse(JSON.stringify(arrayMeaning))
    })
  },
})
export const selectWords = (state: RootState) => state["words"]
export default wordSlice.reducer
