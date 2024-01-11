import { LeftArrow } from "../icons/LeftArrow"
import { RightArrow } from "../icons/RightArrow"

interface IPaginationProps {
  total: number
  limit: number
  page: number
  onPrev: () => void
  onNext: () => void
}

const Pagination = (props: IPaginationProps) => {
  const { total, page, limit, onPrev, onNext } = props
  return (
    <div className="flex gap-2">
      <div className="pagination__text">
        Showing{" "}
        {`${(page - 1) * limit + 1} ~ ${
          total < limit * page ? total : limit * page
        }`}{" "}
        of {total} items
      </div>
      {page != 1 && (
        <LeftArrow
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={onPrev}
        />
      )}
      {total < limit * page
        ? total
        : limit * page < total && (
            <RightArrow
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={onNext}
            />
          )}
    </div>
  )
}

export default Pagination
