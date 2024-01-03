import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TextToSpeech from "../../components/common/TextToSpeech"
import UserNewWordTable from "../../components/table/UserNewWordTable"
import { AppDispatch } from "../../store"
import { getNewWords, selectWords } from "../../store/reducer/word"

const AllWordsPage = () => {
  const { words, textToSpeechWord } = useSelector(selectWords)
  const [wordParams] = useState({
    page: 1,
    limit: 10,
  })
  const dispatch = useDispatch<AppDispatch>()

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
      class: "w-[20%] text-center",
    },
    {
      id: 4,
      label: "Date",
      class: "w-[20%] text-center",
    },
  ]

  useEffect(() => {
    dispatch(getNewWords(wordParams))
  }, [])

  return (
    <div className="flex flex-col gap-[30px]">
    <div className="flex flex-col rounded-b bg-white shadow">
      <div className="flex h-[75px] justify-between items-center px-[20px] border-b">
        <div className="text-2xl text-black font-medium">All your new words</div>
        <div className="w-[84px] h-[31px] text-sm">
          <TextToSpeech text={textToSpeechWord} />
        </div>
      </div>
      <div className="p-[20px] flex flex-col gap-[10px]">
        <UserNewWordTable
          tableHeader={tableHeader}
          tableData={words}
          keyName="word"
        />
      </div>
    </div>
  </div>
  )
}

export default AllWordsPage