import { ChangeEventHandler } from 'react'
import { defaultTagFilters, iconByCategoryFilter, PlaceTag } from '@/lib/utils'
import Icon from './icons'

interface Props {
  checkedItems?: PlaceTag
  onChange: ChangeEventHandler<HTMLInputElement>
}

const RadioGroup = ({ onChange, checkedItems }: Props) => {
  const categories = Object.keys(defaultTagFilters)

  return (
    <div className="w-full py-4 grid grid-cols-3">
      {categories.map(category => {
        const filters = Object.keys(
          defaultTagFilters[category as keyof PlaceTag]
        )
        const iconName = iconByCategoryFilter[category as keyof PlaceTag]

        return (
          <div key={category}>
            <label className="flex items-center gap-x-1 text-xs font-semibold uppercase text-gray-500">
              <Icon name={iconName} className="shrink-0 w-3 h-4 sm:w-4" />
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
                      className="h-4 w-4 border-gray-300 text-teal-500 cursor-pointer focus:ring-teal-500"
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
