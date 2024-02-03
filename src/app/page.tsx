import { getPlacesByVisitedStatus } from '@/lib/firestore'
import { DestinationCategories, Place } from '@/lib/utils'
import { Places, Home, Navigation, PlacePicker, Footer } from './dashboard'

export default async function Page() {
  const bucketList = ((await getPlacesByVisitedStatus('No')) as Place[]) ?? []
  const visited = ((await getPlacesByVisitedStatus('Yes')) as Place[]) ?? []

  return (
    <Home>
      <Navigation />
      <PlacePicker />
      <Places
        category={DestinationCategories.BUCKET_LIST}
        places={bucketList}
      />
      <Places category={DestinationCategories.VISITED} places={visited} />
      <Footer />
    </Home>
  )
}
