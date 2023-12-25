import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom"
import App from "../App"
import AuthPage from "../pages/AuthPages"
import NotFoundPage from "../pages/ErrorPages/NotFoundPage"
import HomePage from "../pages/MainPages/HomePage"
import MainPage from "../pages/MainPages/MainPage"
import LoginView from "../views/AuthView/LoginView"
import RegisterView from "../views/AuthView/RegisterView"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="auth"
        element={
            <AuthPage />
        }
      >
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<LoginView />} />
        <Route path="register" element={<RegisterView />} />
      </Route>

      <Route path="" element={<MainPage />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<HomePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

export default router
