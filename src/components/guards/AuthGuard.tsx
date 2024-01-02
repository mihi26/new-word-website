import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAuth } from "../../store/reducer/auth"
import { useToast } from "../../hooks/useToast"

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useSelector(selectAuth)
  const { warning } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated && location.pathname != '/auth/login') {
      warning("You haven't sign in")
      navigate("/auth/login")
    }
  }, [isAuthenticated]);

  return isAuthenticated && children;
};

export default AuthGuard;
