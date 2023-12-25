import { RepeatIcon } from "../icons/RepeatIcon"
import { VolumeUp } from "../icons/VolumeUp"

const UserNewWordTable = (props) => {
  const {
    tableHeader,
    tableData,
    onClickVolume,
    onClickRepeat,
    keyId = "id",
    keyName = "name"
  } = props
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
        <div className="flex items-center min-h-[40px] py-1" key={item[keyId]}>
          <div className="w-[40%] text-center">{index + 1}</div>
          <div className="flex-1 text-center break-all">{item[keyName]}</div>
          <div className="w-[20%] text-center">{item.date}</div>
          <div className="w-[20%] flex gap-3 justify-center">
            <VolumeUp
              width={24}
              height={24}
              color="#00578A"
              onClick={() => onClickVolume(item)}
              className="cursor-pointer"
            />
            <RepeatIcon
              width={24}
              height={24}
              color="#00578A"
              onClick={() => onClickRepeat(item)}
              className="cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserNewWordTable
