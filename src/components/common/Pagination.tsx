import { Fragment } from "react"
import { LeftArrow } from "../icons/LeftArrow"
import { RightArrow } from "../icons/RightArrow"

interface IPaginationProps {
  total: number
  firstNumber: number
  lastNumber: number
  page: number
}

const Pagination = (props: IPaginationProps) => {
  const {total, firstNumber, lastNumber, page} = props
  return (
    <Fragment>
      <div className="pagination__text">
        Showing {`${firstNumber} ~ ${lastNumber}`} of {total} items
      </div>
      {page != 1 && <LeftArrow width={24} height={24} />}
      {lastNumber < total && <RightArrow width={24} height={24} />}
    </Fragment>
  )
}

export default Pagination
