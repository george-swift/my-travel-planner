import cn from 'classnames'
import { MouseEventHandler, PropsWithChildren } from 'react'

interface ButtonProps extends PropsWithChildren {
  className: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  text?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  className,
  children,
  disabled = false,
  onClick,
  text,
  type = 'button'
}: ButtonProps) => (
  <button
    className={cn(
      'p-2.5 rounded-md text-gray-700 text-sm focus:outline-none',
      'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
      className
    )}
    type={type}
    disabled={disabled}
    {...(!disabled && { onClick })}
  >
    {text && text}
    {children}
  </button>
)

export default Button
