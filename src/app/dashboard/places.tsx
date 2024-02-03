import { Card, Container } from '@/components'
import { Suspense } from 'react'
import { Place, DestinationCategories } from '@/lib/utils'

type DestinationCategory =
  (typeof DestinationCategories)[keyof typeof DestinationCategories]

interface PlacesProps {
  category: DestinationCategory
  places: Place[]
}

export default function Places({ category, places }: PlacesProps) {
  const categories = {
    [DestinationCategories.BUCKET_LIST]: {
      title: 'Places on our bucket list',
      fallback: 'Loading bucket list...',
      notfound: 'Add some places you want to go!'
    },
    [DestinationCategories.VISITED]: {
      title: 'Places we’ve explored',
      fallback: 'Loading visited places...',
      notfound: "Haven't been anywhere yet..."
    }
  }

  return (
    <Container element="section" className="py-12 px-6">
      <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-slate-900">
        {categories[category].title}
      </h2>
      <Suspense fallback={<div>{categories[category].fallback}</div>}>
        <div className="flex flex-wrap mb-4 -mx-3">
          {places.length ? (
            places.map((place, i) => (
              <div
                key={i}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-3 p-3"
              >
                <Card place={place} />
              </div>
            ))
          ) : (
            <p className="p-3 text-base text-gray-700">
              {categories[category].notfound}
            </p>
          )}
        </div>
      </Suspense>
    </Container>
  )
}
