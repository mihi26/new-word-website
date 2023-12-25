import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Button from "../../components/common/Button"
import { RepeatIcon } from "../../components/icons/RepeatIcon"
import { VolumeUp } from "../../components/icons/VolumeUp"
import UserNewWordTable from "../../components/table/UserNewWordTable"
import { getNewWords, selectWords } from "../../store/reducer/word"
import { AppDispatch } from "../../store"

const HomePage = () => {
  const { words } = useSelector(selectWords)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const navigateViewDetail = () => {
    navigate("/")
  }

  useEffect(() => {
    dispatch(getNewWords())
  }, [])

  const handleReadWord = () => {}
  const handleRepeatWord = () => {
    setIsOnRepeat(!isOnRepeat)
  }

  const tableHeader = [
    {
      id: 0,
      label: "No",
      class: "w-[40%] text-center",
    },
    {
      id: 1,
      label: "Name",
      class: "flex-1 text-center",
    },
    {
      id: 2,
      label: "Date",
      class: "w-[20%] text-center",
    },
    {
      id: 3,
      label: "",
      class: "w-[20%]",
    },
  ]

  const tableData = [
    {
      id: 1,
      name: "prosody",
      date: "25/12/2023",
    },
  ]

  const [isOnRepeat, setIsOnRepeat] = useState(false)

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
            <div className="font-bold text-[32px] text-[#00578A]">prosody</div>
            <div className="h-[32px]">
              <Button
                icon={<VolumeUp width={32} height={32} color="#00578A" />}
                label=""
                onClick={handleReadWord}
                backgroundColor="transparent"
                borderColor="transparent"
              ></Button>
            </div>
            <div className="w-[32px] h-[32px]">
              <Button
                icon={<RepeatIcon width={24} height={24} color="#00578A" />}
                label=""
                onClick={handleRepeatWord}
                backgroundColor="transparent"
                borderColor={isOnRepeat ? "border-blue" : "transparent"}
              ></Button>
            </div>
          </div>
          <div className="text-base">
            Prosody is the rhythm and sounds used in poetry. Kids who can
            freestyle rap fit the prosody of their words to a rhythm that's
            already laid down.
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-b bg-white shadow">
        <div className="flex h-[75px] justify-between items-center px-[20px] border-b">
          <div className="text-2xl text-black font-medium">Your new words</div>
        </div>
        <div className="p-[20px] flex flex-col gap-[10px]">
          <UserNewWordTable tableHeader={tableHeader} tableData={words} keyName="word" />
        </div>
      </div>
    </div>
  )
}

export default HomePage
