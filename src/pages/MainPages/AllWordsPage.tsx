import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ApiClientWithToken from "../../api/api"
import Pagination from "../../components/common/Pagination"
import TextToSpeech from "../../components/common/TextToSpeech"
import UserNewWordTable from "../../components/table/UserNewWordTable"
import { selectWords } from "../../store/reducer/word"
import { IWordMeta, IWordParams } from "../../types"
import { convertQueryString } from "../../utils"

const AllWordsPage = () => {
  const { textToSpeechWord } = useSelector(selectWords)
  const [words, setWords] = useState([])
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

  const getNewWords = async () => {
    let res = await ApiClientWithToken.get(
      `word${convertQueryString(wordParams)}`
    )
    setWords(res.data.data)
    setWordMeta(res.data.meta)
  }

  const setVoicesForHomePage = (en: string, vn: string) => {
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

  useEffect(() => {
    getNewWords()
  }, [wordParams])

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
