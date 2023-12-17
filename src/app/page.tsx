import { getPlacesByVisitedStatus } from '@/lib/firestore'
import { DestinationCategories, Place } from '@/lib/utils'
import { Places, Hero, Home, Navigation, PlacePicker } from './dashboard'

export default async function Page() {
  const bucketList = ((await getPlacesByVisitedStatus('No')) as Place[]) ?? []
  const visited = ((await getPlacesByVisitedStatus('Yes')) as Place[]) ?? []

  return (
    <Home>
      <Navigation />
      <Hero />
      <PlacePicker />
      <Places
        category={DestinationCategories.BUCKET_LIST}
        places={bucketList}
      />
      <Places category={DestinationCategories.VISITED} places={visited} />
    </Home>
  )
}
