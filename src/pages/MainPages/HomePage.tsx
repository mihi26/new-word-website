import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Button from "../../components/common/Button"
import UserNewWordTable from "../../components/table/UserNewWordTable"
import { getNewWords, selectWords } from "../../store/reducer/word"
import { AppDispatch } from "../../store"
import TextToSpeech from "../../components/common/TextToSpeech"
import { IWord } from "../../types"

type TodayWordFunction = () => IWord

const HomePage = () => {
  const { words, textToSpeechWord } = useSelector(selectWords)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const navigateViewDetail = () => {
    navigate("/")
  }

  useEffect(() => {
    dispatch(
      getNewWords({
        page: 1,
        limit: 10,
      })
    )
  }, [])

  const todayWord: TodayWordFunction = () => {
    return words?.slice(-1)[0]
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
      class: "w-[20%] text-center",
    },
    {
      id: 4,
      label: "Date",
      class: "w-[20%] text-center",
    },
  ]

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col rounded-b bg-white shadow">
        <div className="flex h-[75px] justify-between items-center px-[20px] border-b">
          <div className="text-2xl text-black font-medium">Word of the day</div>
          <div className="w-[84px] h-[31px] text-sm">
            <Button
              rounded="rounded"
              label="View detail"
              onClick={navigateViewDetail}
            />
          </div>
        </div>
        <div className="p-[20px] flex flex-col gap-[10px]">
          <div className="flex gap-4 items-center">
            <div className="font-bold text-[32px] text-[#00578A]">
              {todayWord()?.word}
            </div>
          </div>
          <div className="text-base">
            {todayWord()?.definition?.map((definition) => (
              <div className="" key={definition.type + definition.meaning}>
                {definition.meaning} ({definition.meaningVN})
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-b bg-white shadow">
        <div className="flex h-[75px] justify-between items-center px-[20px] border-b">
          <div className="text-2xl text-black font-medium">Today's new words</div>
          <TextToSpeech text={textToSpeechWord} />
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

export default HomePage
