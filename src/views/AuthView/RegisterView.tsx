import TextInput from "../../components/common/TextInput"
import Button from "../../components/common/Button"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { setLoading } from "../../store/reducer/loading"
import { LoginClient } from "../../api/api"
import { useToast } from "../../hooks/useToast"

const RegisterView = () => {
  const navigate = useNavigate()
  const { success, error } = useToast()

  const dispatch = useDispatch<AppDispatch>()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email("Invalid email"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Your password doesn't match with the initial password"
      ),
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
        dispatch(setLoading(true))
        const res = await LoginClient.post("auth/signup", payload)
        if (res.message == "success") {
          success("Register completed")
          navigate("/auth/login")
        }
      } catch {
        error("Register failed")
      } finally {
        dispatch(setLoading(false))
      }
    },
  })

  const setInputField = (field: string, value: string) => {
    formik.setFieldValue(field, value)
  }

  const navigateToLogin = () => {
    navigate("/auth/login")
  }

  return (
    <div className="flex flex-col gap-10 animate-[fadeLeft_0.5s_normal_forwards_ease-in-out]">
      <div className="font-bold leading-10 text-black text-[32px] text-center">
        Register
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-[14px] mb-2 text-[#78828A]">Email</div>
          <div className="min-h-[52px]">
            <TextInput
              type="text"
              field="email"
              placeholder="Enter your email"
              onChange={setInputField}
              errorMessage={formik.errors.email}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-[14px] mb-2 text-[#78828A]">
            Password
          </div>
          <div className="min-h-[52px]">
            <TextInput
              type="password"
              field="password"
              placeholder="Enter your password"
              onChange={setInputField}
              errorMessage={formik.errors.password}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-[14px] mb-2 text-[#78828A]">
            Confirm password
          </div>
          <div className="min-h-[52px]">
            <TextInput
              type="password"
              field="confirmPassword"
              placeholder="Enter your password"
              onChange={setInputField}
              errorMessage={formik.errors.confirmPassword}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="font-semibold h-[58px]">
          <Button label="Register" onClick={formik.handleSubmit} />
        </div>
        <div className="text-[#78828A] text-center font-[600]">
          Already have an account?
          <span className="text-blue cursor-pointer" onClick={navigateToLogin}>
            {" "}
            Login
          </span>
        </div>
      </div>
    </div>
  )
}

export default RegisterView
