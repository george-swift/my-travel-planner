import { ChangeEventHandler } from 'react'

interface Props {
  id: string
  name: string
  label: string
  defaultValue: string
  options: string[]
  onBlur: ChangeEventHandler<HTMLSelectElement>
  wrapperClasses?: string
}

const Select = ({
  id,
  name,
  label,
  defaultValue,
  options,
  onBlur,
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
      <select
        id={id}
        name={name}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-yellow-400 sm:text-sm sm:leading-6"
        defaultValue={defaultValue}
        onBlur={onBlur}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
