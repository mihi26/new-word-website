import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import Pagination from "../../components/common/Pagination"
import TextToSpeech from "../../components/common/TextToSpeech"
import UserNewWordTable from "../../components/table/UserNewWordTable"
import {getNewWords, selectWords} from "../../store/reducer/word"
import {IWordMeta, IWordParams} from "../../types"
import {AppDispatch} from "../../store";
import { useNavigate } from "react-router-dom"

const AllWordsPage = () => {
    const {words, textToSpeechWord, pagination} = useSelector(selectWords)
    const [vnVoiceFromHomePage, setVnVoiceFromHomePage] = useState<any>("")
    const [enVoiceFromHomePage, setEnVoiceFromHomePage] = useState<any>("")
    const [wordParams, setWordParams] = useState<IWordParams>({
        page: 1,
        limit: 10,
    })
    const [wordMeta, setWordMeta] = useState<IWordMeta>({
        page: 0,
        limit: 0,
        total: 0,
        totalPages: 0,
    })
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleRedirectWordDetail = (wordId) => {
        navigate(`/word/${wordId}`)
      }

    const tableHeader = [
        {
            id: 0,
            label: "No",
            class: "w-[5%] text-center",
        },
        {
            id: 1,
            label: "Word",
            class: "w-[20%] text-center",
        },
        {
            id: 2,
            label: "Definition",
            class: "w-[35%] text-center",
        },
        {
            id: 3,
            label: "Example",
            class: "w-[30%] text-center",
        },
        {
            id: 4,
            label: "Date",
            class: "w-[10%] text-center",
        },
    ]
    useEffect(() => {
        dispatch(
            getNewWords({
                page: wordParams.page,
                limit: 10,
            })
        )
    }, [wordParams])

    useEffect(() => {
        setWordMeta(pagination)
    }, [pagination])
    const setVoicesForHomePage = (en: string, vn: string) => {
        console.log(en)
        setEnVoiceFromHomePage((current) => {
            current = en
            return current
        })
        setVnVoiceFromHomePage((current) => {
            current = vn
            return current
        })
    }

    const handleNextPage = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        setWordParams((prevState) => ({
            ...prevState,
            page: prevState.page + 1,
        }))
    }

    const handlePrevPage = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        setWordParams((prevState) => ({
            ...prevState,
            page: prevState.page - 1,
        }))
    }

    return (
        <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col rounded-b bg-white shadow">
                <div className="flex h-[75px] justify-between items-center px-[20px] border-b">
                    <div className="text-2xl text-black font-medium">
                        All your new words
                    </div>
                    <TextToSpeech
                        text={textToSpeechWord}
                        setVoicesForHomePage={setVoicesForHomePage}
                    />
                </div>
                <div className="p-[20px] flex flex-col gap-[10px]">
                    <UserNewWordTable
                        vnVoiceFromHomePage={vnVoiceFromHomePage}
                        enVoiceFromHomePage={enVoiceFromHomePage}
                        tableHeader={tableHeader}
                        tableData={words}
                        keyName="word"
                        onClickWord={handleRedirectWordDetail}
                    />
                    <div className="ml-auto">
                        <Pagination
                            total={wordMeta.total}
                            page={wordParams?.page}
                            limit={wordParams?.limit}
                            onNext={handleNextPage}
                            onPrev={handlePrevPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllWordsPage
