import { Outlet } from "react-router-dom"
import { selectLoading } from "./store/reducer/loading"
import { useSelector } from "react-redux"
import { Fragment } from "react"
import Loading from "./components/common/Loading"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const { isLoading } = useSelector(selectLoading)
  return (
    <Fragment>
      <ToastContainer
        newestOnTop
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss={false}
      />
      {isLoading && <Loading />}
      <Outlet />
    </Fragment>
  )
}

export default App
