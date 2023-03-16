import { ChangeEventHandler } from 'react'
import { defaultTagFilters, PlaceTag } from '@/lib/utils'

interface Props {
  checkedItems?: PlaceTag
  onChange: ChangeEventHandler<HTMLInputElement>
}

const RadioGroup = ({ onChange, checkedItems }: Props) => {
  const categories = Object.keys(defaultTagFilters)

  return (
    <div className="w-full py-4 flex flex-wrap">
      {categories.map(category => {
        const filters = Object.keys(
          defaultTagFilters[category as keyof PlaceTag]
        )

        return (
          <div key={category} className="w-1/3">
            <label className="text-xs font-bold tracking-wide uppercase text-gray-500">
              {category}
            </label>
            <fieldset className="mt-3">
              <legend className="sr-only">Tag Category Filter</legend>
              <div className="space-y-4">
                {filters.map(filter => (
                  <div key={filter} className="flex items-center">
                    <input
                      id={filter}
                      name={category}
                      type="radio"
                      onChange={onChange}
                      value={`tag-${filter}`}
                      defaultChecked={
                        checkedItems
                          ? checkedItems[category as keyof PlaceTag] === filter
                          : false
                      }
                      className="h-4 w-4 border-gray-300 text-yellow-500 cursor-pointer focus:ring-yellow-500"
                    />
                    <label
                      htmlFor={filter}
                      className="ml-3 block text-sm font-medium leading-6 text-gray-900 capitalize cursor-pointer "
                    >
                      {filter}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        )
      })}
    </div>
  )
}

export default RadioGroup
