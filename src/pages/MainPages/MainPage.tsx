import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const MainPage = () => {
  return (
    <div className='flex relative'>
      <Sidebar />
      <div className='w-[calc(100%-300px)] h-full ml-[300px]'>
        <Header />
        <div className='p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainPage
