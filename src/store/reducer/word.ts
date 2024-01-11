import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {RootState} from ".."
import {setLoading} from "./loading"
import ApiClientWithToken from "../../api/api"
import {IWord} from "../../types"
import {convertQueryString} from "../../utils"

interface IWordState {
    words: IWord[]
    textToSpeechWord: ITextState[],
    pagination: IPaginationState
}

interface ITextState {
    key: string,
    text: string
}

interface IPaginationState {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
}

const initialState: IWordState = {
    words: [],
    textToSpeechWord: [],
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    }
}

export const getNewWords = createAsyncThunk(
    "words/getWords",
    async (payload: any | undefined, {rejectWithValue, dispatch}) => {
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
        builder.addCase(getNewWords.fulfilled, (state, {payload}) => {
            state.words = payload.data
            state.pagination = payload.meta
            const arrayMeaning: ITextState[] = []
            payload.data.forEach((item, index) => {
                let fullWord = item.word.split('/')[0].trim();
                fullWord = `Number ${index + 1}. ${fullWord}. ${fullWord.split('').join(' . ')}`
                arrayMeaning.push({key: 'en-US', text: fullWord})
                item.definition.map((data, indexDef) => {
                    arrayMeaning.push({
                        key: 'en-US',
                        text: (indexDef === 0 ? 'Definition. ' : '') + data.type + ': ' + data.meaning
                    })
                    arrayMeaning.push({key: 'vi-VN', text: data.meaningVN})
                })
                arrayMeaning.push({key: 'en-US', text: 'Example. ' + item.example})
                arrayMeaning.push({key: 'vi-VN', text: item.exampleVN})
            })
            state.textToSpeechWord = JSON.parse(JSON.stringify(arrayMeaning))
        })
    },
})
export const selectWords = (state: RootState) => state["words"]
export default wordSlice.reducer
