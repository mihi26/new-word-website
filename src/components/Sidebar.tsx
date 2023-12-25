import { Fragment, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AdminIcon } from "./icons/AdminIcon"
import { CalendarIcon } from "./icons/CalendarIcon"
import { DownArrow } from "./icons/DownArrow"
import { GlobeLearningIcon } from "./icons/GlobeLearningIcon"
import { HomeIcon } from "./icons/HomeIcon"
import { RightArrow } from "./icons/RightArrow"
import { WordIcon } from "./icons/WordIcon"

const sidebarMenu = [
  {
    id: 0,
    label: "Learning",
    icon: <GlobeLearningIcon width={24} height={24} />,
    hasAuthority: false,
    subMenu: [
      {
        id: "home-page",
        label: "Home Page",
        icon: <HomeIcon width={24} height={24} />,
        url: "/home",
      }
    ],
    isShowSubMenu: false,
  },
  {
    id: 1,
    label: "Admin",
    icon: <AdminIcon width={24} height={24} />,
    hasAuthority: true,
    subMenu: [
      {
        id: "word-management",
        label: "Word management",
        icon: <WordIcon width={24} height={24} />,
        url: "/admin/word-management",
      },
    ],
    isShowSubMenu: false,
  },
]

function Sidebar() {
  const [sidebarState, setSidebarState] = useState(sidebarMenu)

  const navigate = useNavigate()
  const location = useLocation()

  const handleToggleSubMenu = (id: number) => {
    const newState = sidebarState.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          isShowSubMenu: !item.isShowSubMenu,
        }
      } else item.isShowSubMenu = false
      return item
    })
    setSidebarState(newState)
  }

  const handleRedirect = (url) => {
    navigate(url)
  }

  return (
    <div className="w-[300px] bg-white h-full fixed flex flex-col">
      <div className="p-[20px] h-[85px] flex justify-between items-center">
        <div className="text-lg font-semibold text-blue cursor-default">NEW WORD EVERYDAY</div>
      </div>
      <div className="pt-6 flex flex-col">
        {sidebarState.map((item) => (
          <Fragment key={item.id}>
            <div
              className={`flex justify-between items-center h-[50px] px-[20px] cursor-pointer hover:text-blue hover:bg-slate-100 hover:border-r-2 border-[#066cfa] ${
                item.isShowSubMenu ? "border-r-2 text-blue bg-slate-100" : ""
              }`}
              onClick={() => handleToggleSubMenu(item.id)}
            >
              <div className="flex gap-2">
                {item.icon}
                <div className="">{item.label}</div>
              </div>
              {item.isShowSubMenu ? (
                <DownArrow width={24} height={24} />
              ) : (
                <RightArrow width={24} height={24} />
              )}
            </div>
            {item.isShowSubMenu && (
              <div className="flex flex-col">
                {item.subMenu.map((subItem) => (
                  <div
                    className={`flex justify-between items-center h-[50px] px-[40px] cursor-pointer hover:text-blue hover:bg-slate-100 ${
                      subItem.url == location.pathname
                        ? "border-r-2 text-blue bg-slate-100"
                        : ""
                    }`}
                    key={subItem.id}
                    onClick={() => handleRedirect(subItem.url)}
                  >
                    <div className="flex gap-2">
                      {subItem.icon}
                      <div className="">{subItem.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
