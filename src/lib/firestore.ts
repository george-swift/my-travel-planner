import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  getDocs,
  setDoc,
  deleteDoc
} from 'firebase/firestore'

import { defaultApp } from './config'
import {
  Place,
  PlaceTag,
  snapshotToArray,
  slugify,
  PlaceTagFilters
} from './utils'

const firestore = getFirestore(defaultApp)

export const getPlacesByVisitedStatus = async (status: string) => {
  try {
    const q = query(
      collection(firestore, 'places'),
      where('visited', '==', status)
    )
    const querySnapshot = await getDocs(q)
    return snapshotToArray(querySnapshot)
  } catch (error) {
    console.error('📣: Unable to fetch data', error)
  }
}

export const getPlacesByTags = async (
  tagsToQuery: PlaceTag | PlaceTagFilters
) => {
  try {
    let q = query(collection(firestore, 'places'), where('visited', '==', 'No'))

    for (const key in tagsToQuery) {
      const value = tagsToQuery[key as keyof PlaceTag]
      if (value) {
        q = query(
          collection(firestore, 'places'),
          where('visited', '==', 'No'),
          where(`tags.${key}`, '==', value)
        )
      }
    }

    const querySnapshot = await getDocs(q)
    return snapshotToArray(querySnapshot)
  } catch (e) {
    console.error('📣: Unable to fetch data', e)
  }
}

export const addPlace = async (place: Place) => {
  try {
    await setDoc(
      doc(firestore, 'places', place.id ? place.id : slugify(place.name)),
      place
    )
  } catch (e) {
    console.error('📣: Unable to add place', e)
  }
}

export const deletePlace = async (place: Place) => {
  if (!place.id) return

  try {
    await deleteDoc(doc(firestore, 'places', place.id))
  } catch (e) {
    console.error('📣: Unable to delete place', e)
  }
}
