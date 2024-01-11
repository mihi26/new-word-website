import moment from "moment"
import { VolumeUp } from "../icons/VolumeUp"

interface ITextState {
  key: string
  text: string
}

const UserNewWordTable = (props) => {
  const {
    tableHeader,
    tableData,
    keyId = "id",
    keyName = "name",
    vnVoiceFromHomePage,
    enVoiceFromHomePage,
  } = props
  const handlePlaySound = async (item, index) => {
    const synth = window.speechSynthesis
    synth.cancel()
    const voices = synth.getVoices()
    const arrayMeaning: ITextState[] = []
    let fullWord = item.word.split("/")[0].trim()
    fullWord = `Number ${index + 1}. ${fullWord}. ${fullWord
      .split("")
      .join(" . ")}`
    arrayMeaning.push({ key: "en-US", text: fullWord })
    item.definition.map((data, indexDef) => {
      arrayMeaning.push({
        key: "en-US",
        text: (indexDef === 0 ? "Definition. " : "") + data.meaning,
      })
      arrayMeaning.push({ key: "vi-VN", text: data.meaningVN })
    })
    arrayMeaning.push({ key: "en-US", text: "Example. " + item.example })
    arrayMeaning.push({ key: "vi-VN", text: item.exampleVN })
    arrayMeaning.map((data) => {
      const u = new SpeechSynthesisUtterance(data.text)
      u.voice = voices.find((voice) => {
        return (
          voice.name ===
          (data.key === "en-US" ? enVoiceFromHomePage : vnVoiceFromHomePage)
        )
      })!
      u.rate = 0.8
      synth.speak(u)
    })
  }
  return (
    <div className="flex flex-col w-full bg-white shadow rounded">
      <div className="flex bg-[#dcdcdc] items-center h-[40px]">
        {tableHeader.map((item) => (
          <div className={`${item.class}`} key={item.id}>
            {item.label}
          </div>
        ))}
      </div>
      {tableData.map((item, index) => (
        <div
          className="flex items-center min-h-[40px] border-b last:border-b-0"
          key={item[keyId]}
        >
          <div className="w-[5%] text-center h-full">{index + 1}</div>
          <div className="w-[20%] text-center break-all flex items-center gap-2">
            {item[keyName]}
            <div
              className="bg-[#066cfa] w-min rounded-3xl p-2 cursor-pointer"
              onClick={() => handlePlaySound(item, index)}
            >
              <VolumeUp width={24} height={24} color="white" />
            </div>
          </div>
          <div className="w-[35%]">
            {item.definition?.map((def) => (
              <div className="p-1" key={`${def.type} ${def.meaning}`}>
                - {def.meaning} ({def.meaningVN})
              </div>
            ))}
          </div>
          <div className="w-[30%] p-1">
            {item.example} ({item.exampleVN})
          </div>
          <div className="w-[10%] text-center">
            {moment(item.createdAt).format("DD-MM-YYYY")}
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserNewWordTable
