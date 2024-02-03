import { ChangeEventHandler } from 'react'

interface Props {
  id: string
  name: string
  placeholder?: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  wrapperClasses?: string
}

const Textarea = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  wrapperClasses
}: Props) => {
  return (
    <div className={wrapperClasses}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          rows={3}
          name={name}
          id={id}
          className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:py-1.5 sm:text-sm sm:leading-6"
          value={value}
          onChange={onChange}
          {...(placeholder && { placeholder })}
        />
      </div>
    </div>
  )
}

export default Textarea
