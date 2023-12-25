import { Outlet } from "react-router-dom"
import loginBackground from "../../assets/login_wallpaper.png"

const AuthView = () => {
  return (
    <div className="flex h-screen w-full">
      <div
        className="w-3/5"
        style={{ backgroundImage: `url(${loginBackground})` }}
      ></div>
      <div className="flex flex-col w-full sm:w-2/5 py-6 bg-white px-6 sm:px-[5%] overflow-auto">
        <div className="font-bold leading-7 mb-[42px] sm:mb-[78px] text-black text-center">
          New word everyday
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthView
