import { ChangeEventHandler } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  id: string
  name: string
  placeholder?: string
  label: string
  type: string
  value?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  required?: boolean
  inputClasses?: string
  wrapperClasses?: string
}

const Input = ({
  id,
  name,
  placeholder,
  label,
  type,
  value,
  onChange,
  inputClasses,
  wrapperClasses,
  required = false
}: Props) => {
  return (
    <div className={wrapperClasses}>
      <label
        htmlFor={id}
        className={cn('block text-sm font-medium leading-6 text-gray-900', {
          'flex justify-between items-center': type === 'url' && value
        })}
      >
        <span>{label}</span>
        {type === 'url' && value && (
          <span className="text-xs text-teal-500 font-medium tracking-wide uppercase">
            <a href={value} target="_blank" rel="noopener noreferrer">
              Preview
            </a>
          </span>
        )}
      </label>
      <div className={cn('mt-2', inputClasses)}>
        <input
          id={id}
          name={name}
          type={type}
          {...(value && { value })}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
          {...(placeholder && { placeholder })}
          required={required}
        />
      </div>
    </div>
  )
}

export default Input
