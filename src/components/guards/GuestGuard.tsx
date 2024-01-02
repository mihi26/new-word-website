import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAuth } from "../../store/reducer/auth"
import { useToast } from "../../hooks/useToast"

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useSelector(selectAuth)
  const { warning } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isAuthenticated && location.pathname == '/auth/login') {
      warning("You have already logged in")
      navigate("/")
    }
  }, [isAuthenticated])

  return !isAuthenticated && children
};

export default GuestGuard;
