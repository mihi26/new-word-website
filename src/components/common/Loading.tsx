import { Fragment } from "react"

const Loading = () => {
  return (
    <Fragment>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black opacity-80 z-[99]" />
      <div className="fixed h-full w-full top-0 left-0 right-0 bottom-0 z-[100] flex flex-col items-center justify-center">
        <div className="border-[16px] rounded-full border-t-[16px] border-t-blue border-[#f3f3f3] w-[120px] h-[120px] animate-spin" />
      </div>
    </Fragment>
  )
}

export default Loading
