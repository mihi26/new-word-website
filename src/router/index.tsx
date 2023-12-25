import {
  createBrowserRouter,
  createRoutesFromElements, Navigate, Route
} from "react-router-dom"
import App from "../App"
import NotFoundPage from "../pages/ErrorPages/NotFoundPage"
import HomePage from "../pages/MainPages/HomePage"
import MainPage from "../pages/MainPages/MainPage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<MainPage />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<HomePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

export default router
