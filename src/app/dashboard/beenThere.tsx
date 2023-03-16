import { Suspense } from 'react'

import { Card, Container } from '@/components'

import { getPlacesByVisitedStatus } from '@/lib/firestore'
import { Place } from '@/lib/utils'

export default async function BeenThere() {
  const places = ((await getPlacesByVisitedStatus('Yes')) as Place[]) ?? []

  return (
    <Container element="section" className="py-12 px-6">
      <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-slate-900">
        Places I&apos;ve been
      </h2>
      <Suspense fallback={<div>Loading visited places...</div>}>
        <div className="flex flex-wrap mb-4 -mx-3">
          {places.length ? (
            places.map((place, i) => (
              <div
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-3 p-3"
                key={i}
              >
                <Card place={place} />
              </div>
            ))
          ) : (
            <p className="p-3 text-base text-gray-700">
              Haven&apos;t been anywhere yet...
            </p>
          )}
        </div>
      </Suspense>
    </Container>
  )
}
