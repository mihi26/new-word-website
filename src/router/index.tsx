import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom"
import App from "../App"
import AuthGuard from "../components/guards/AuthGuard"
import GuestGuard from "../components/guards/GuestGuard"
import AuthPage from "../pages/AuthPages"
import NotFoundPage from "../pages/ErrorPages/NotFoundPage"
import AllWordsPage from "../pages/MainPages/AllWordsPage"
import HomePage from "../pages/MainPages/HomePage"
import MainPage from "../pages/MainPages/MainPage"
import WordDetailPage from "../pages/MainPages/WordDetailPage/WordDetailPage"
import LoginView from "../views/AuthView/LoginView"
import RegisterView from "../views/AuthView/RegisterView"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="auth"
        element={
          <GuestGuard>
            <AuthPage />
          </GuestGuard>
        }
      >
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<LoginView />} />
        <Route path="register" element={<RegisterView />} />
      </Route>
      <Route
        path=""
        element={
          <AuthGuard>
            <MainPage />
          </AuthGuard>
        }
      >
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="all-words" element={<AllWordsPage />} />
        <Route path="word/:wordId" element={<WordDetailPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

export default router
