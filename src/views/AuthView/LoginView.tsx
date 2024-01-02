import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { LoginClient } from "../../api/api"
import Button from "../../components/common/Button"
import TextInput from "../../components/common/TextInput"
import { useToast } from "../../hooks/useToast"
import { AppDispatch } from "../../store"
import { saveUserCredentials } from "../../store/reducer/auth"
import { setLoading } from "../../store/reducer/loading"

const LoginView = () => {
  const navigate = useNavigate()

  const { success, error } = useToast()

  const dispatch = useDispatch<AppDispatch>()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email("Invalid email"),
      password: Yup.string().required("Password is required"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(setLoading(true))
      const payload = {
        email: values.email,
        password: values.password,
      }
      try {
        const res = await LoginClient.post("auth/login", payload)
        const userCredentials = {
          accessToken: res?.access_token,
        }
        dispatch(saveUserCredentials(userCredentials))
        success("Login successfully")
        navigate("/home")
      } catch {
        error("Login failed")
      } finally {
        dispatch(setLoading(false))
      }
    },
  })

  const setInputField = (field: string, value: string) => {
    formik.setFieldValue(field, value)
  }

  const navigateToRegister = () => {
    navigate("/auth/register")
  }

  return (
    <div className="flex flex-col gap-10 animate-[fadeRight_0.5s_normal_forwards_ease-in-out]">
      <div className="font-bold leading-10 text-black text-[28px] sm:text-[32px] text-center">
        Welcome to New word everyday
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-[14px] mb-2 text-[#78828A]">Email</div>
          <div className="h-[52px]">
            <TextInput
              type="text"
              placeholder="Enter your email"
              onChange={setInputField}
              field="email"
              errorMessage={formik.errors.email}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-[14px] mb-2 text-[#78828A]">
            Password
          </div>
          <div className="h-[52px]">
            <TextInput
              type="password"
              placeholder="Enter your password"
              onChange={setInputField}
              field="password"
              errorMessage={formik.errors.password}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="h-[58px] font-semibold">
          <Button label="Login" onClick={formik.handleSubmit} />
        </div>
        <div className="text-[#9CA4AB] text-center font-[600]">
          Don't have an account?
          <span
            className="text-blue cursor-pointer"
            onClick={navigateToRegister}
          >
            {" "}
            Register
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginView
