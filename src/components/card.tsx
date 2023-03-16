'use client'

import Image from 'next/image'
import cn from 'classnames'

import Tag from './tag'

import eventBus from '@/lib/eventbus'
import { Place, PlaceTag } from '@/lib/utils'

interface Props {
  place: Place
  className?: string
}

const Card = ({ place, className }: Props) => {
  const editPlace = () => eventBus.emit('editPlace', place)

  return (
    <div
      className={cn(
        'flex flex-col justify-between w-full h-full rounded overflow-hidden shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none cursor-pointer',
        className
      )}
      onClick={editPlace}
      role="button"
      tabIndex={0}
    >
      <div>
        {place.img && (
          <div className="w-full min-h-[200px] bg-gray-200 ">
            <Image
              className="aspect-[4/3] object-cover lg:h-full lg:w-full"
              width={500}
              height={500}
              src={place.img}
              alt={place.name}
            />
          </div>
        )}
        <div className="px-6 pt-4 lg:px-[1.4rem]">
          <div className="flex justify-between items-center mb-2 text-xl font-bold">
            {place.name}
          </div>

          {place.description && (
            <p className="text-gray-700 text-base">{place.description}</p>
          )}

          {place.visited === 'Yes' && place.visitedDate && (
            <dl>
              <dt className="font-medium text-gray-900">Date visited</dt>
              <dd className="text-gray-500">
                <time
                  dateTime={new Date(place.visitedDate).toLocaleDateString()}
                >
                  {new Date(place.visitedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </dd>
            </dl>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center px-6 py-4 gap-2">
        {place.tags &&
          Object.keys(place.tags).map(
            (category, i) =>
              place.tags[category as keyof PlaceTag] && (
                <Tag
                  key={i}
                  tag={place.tags[category as keyof PlaceTag]}
                  isFlight={category === 'flight'}
                />
              )
          )}
      </div>
    </div>
  )
}

export default Card
