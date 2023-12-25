import { useNavigate } from "react-router-dom"
import Button from "../../components/common/Button"
import { HomeIcon } from "../../components/icons/HomeIcon"
import { Icon404 } from "../../components/icons/Icon404"

function NotFoundPage() {
  const navigate = useNavigate()
  const handleNavigateHome = () => {
    navigate("/home")
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <Icon404 width={400} height={400} color="#066cfa" />
      <div className="text-3xl font-bold">Oops! This page is not found</div>
      <div className="text-base">The requested page doesn't exist</div>
      <div className="w-[160px] h-[40px]">
        <Button
          label="Back to home"
          rounded="rounded"
          onClick={handleNavigateHome}
          icon={<HomeIcon width={24} height={24} color="white" />}
        />
      </div>
    </div>
  )
}

export default NotFoundPage
