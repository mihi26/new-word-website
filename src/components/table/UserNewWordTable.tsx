import moment from "moment"
const UserNewWordTable = (props) => {
  const {
    tableHeader,
    tableData,
    keyId = "id",
    keyName = "name",
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
        <div className="flex items-center min-h-[40px] border-b last:border-b-0" key={item[keyId]}>
          <div className="w-[5%] text-center h-full">{index + 1}</div>
          <div className="w-[20%] text-center break-all">{item[keyName]}</div>
          <div className="w-[35%]">
            {item.definition?.map(def => (
              <div className="p-1">
                - {def.meaning}
              </div>
              ))}
          </div>
          <div className="w-[20%] p-1">
            {item.example}
          </div>
          <div className="w-[20%] text-center">
            {moment(item.createdAt).format("DD-MM-YYYY")}
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserNewWordTable
