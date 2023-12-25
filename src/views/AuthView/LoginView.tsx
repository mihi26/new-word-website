import { useNavigate } from "react-router-dom"
import Button from "../../components/common/Button"
import { useFormik } from "formik"
import * as Yup from "yup"
import { setLoading } from "../../store/reducer/loading"
import { LoginClient } from "../../api/api"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { useToast } from "../../hooks/useToast"
import { saveUserCredentials } from "../../store/reducer/auth"
import TextInput from "../../components/common/TextInput"

const LoginView = () => {
  const navigate = useNavigate()

  const { success, error } = useToast()

  const dispatch = useDispatch<AppDispatch>()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // dispatch(setLoading(true))
      // const payload = {
      //   username: values.username,
      //   password: values.password,
      // }
      // try {
      //   const res = await LoginClient.post("auth/authenticate", payload)
      //   if (res.accountStatus == "BANNED") {
      //     error(
      //       "Your account has been banned ! Please contact our administrator"
      //     )
      //   } else {
      //     const userCredentials = {
      //       accessToken: res?.token,
      //       userInfo: {
      //         userId: res?.userId,
      //         username: res?.username,
      //         name: res?.name,
      //         address: res?.address,
      //         phoneNumber: res?.phoneNumber,
      //         accountStatus: res?.accountStatus,
      //         role: res?.role,
      //       },
      //     }
      //     dispatch(saveUserCredentials(userCredentials))
      //     success("Login successfully")
      //     navigate("/")
      //   }
      // } catch {
      //   error("Login failed")
      // } finally {
      //   dispatch(setLoading(false))
      // }
      navigate("/")
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
          <div className="text-sm text-[14px] mb-2 text-[#78828A]">
            Username
          </div>
          <div className="h-[52px]">
            <TextInput
              type="text"
              placeholder="Enter your username"
              onChange={setInputField}
              field="username"
              errorMessage={formik.errors.username}
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
