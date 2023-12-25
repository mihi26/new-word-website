import { ReactElement, SVGProps } from "react"

interface IButtonProps {
  backgroundColor?: string
  textColor?: string
  label: string
  borderColor?: string
  hoverColor?: string
  icon?: ReactElement<SVGProps<SVGSVGElement>>
  onClick: () => void
  rounded?: string
  disabled?: boolean
}

const Button = (props: IButtonProps) => {
  const {
    backgroundColor = "bg-[#066cfa]",
    textColor = "text-[#f9f9f9]",
    borderColor = "border-blue",
    hoverColor = backgroundColor == "bg-transparent" ? "hover:bg-blue" : "",
    label,
    icon,
    onClick,
    rounded = "rounded-3xl",
    disabled = false
  } = props
  return (
    <div
      className={`flex justify-center items-center w-full border ${backgroundColor} ${borderColor} ${hoverColor} ${rounded} ${disabled && 'pointer-events-none opacity-50'} cursor-pointer h-full`}
      onClick={onClick}
    >
      {icon}
      {label ? <div className={`${icon ? "ml-[10px]" : ""} ${textColor}`}>{label}</div> : ""}
    </div>
  )
}

export default Button
