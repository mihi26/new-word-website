import { useState, useEffect, ReactElement, SVGProps, Fragment } from "react"
import { MdiEyeOff } from "../icons/MdiEyeOff"
import { MdiEyeOutline } from "../icons/MdiEyeOutline"

interface ITextInputProps {
  type?: "text" | "password"
  value?: string
  placeholder?: string
  label?: string
  field?: string
  backgroundColor?: string
  onChange: (value: string, field: string) => void
  errorMessage?: string
  icon?: ReactElement<SVGProps<SVGSVGElement>>
  disable?: boolean
}

const TextInput = (props: ITextInputProps) => {
  const {
    type,
    value,
    placeholder,
    field,
    backgroundColor = "bg-[#f9f9f9]",
    onChange,
    errorMessage,
    icon,
    disable = false,
  } = props
  const [inputValue, setInputValue] = useState("")
  const [passwordEyeToggle, setPasswordEyeToggle] = useState(false)
  const [inputType, setInputType] = useState("text")

  useEffect(() => {
    if (value != "") {
      setInputValue(value || "")
    }
  }, [value])

  useEffect(() => {
    if (type) {
      setInputType(type)
    }
  }, [type])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange(field || "", e.target.value)
  }

  const handleToggleEye = () => {
    const prevEyeToggleState = passwordEyeToggle
    setPasswordEyeToggle(!passwordEyeToggle)
    setInputType(!prevEyeToggleState ? "text" : "password")
  }

  return (
    <Fragment>
      <div
        className={`${backgroundColor} flex items-center rounded px-4 h-full justify-between border ${
          errorMessage ? "border-[#ff3333]" : "border-[#E9EBED]"
        }`}
      >
        {!!icon && <div className="mr-3">{icon}</div>}
        <input
          className={`${backgroundColor} outline-none text-black w-full text-base`}
          type={inputType}
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChangeInput}
          readOnly={disable}
        />
        {type == "password" ? (
          <div className="ml-2 cursor-pointer">
            {passwordEyeToggle ? (
              <MdiEyeOutline
                color="#066cfa"
                width="18px"
                height="18px"
                onClick={handleToggleEye}
              />
            ) : (
              <MdiEyeOff
                color="#066cfa"
                width="18px"
                height="18px"
                onClick={handleToggleEye}
              />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {errorMessage && (
        <div className="text-red-500 text-[14px] mt-1">{errorMessage}</div>
      )}
    </Fragment>
  )
}

export default TextInput
