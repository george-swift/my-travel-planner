import { DocumentData, QuerySnapshot } from 'firebase/firestore'
import clsx from 'classnames'
import { twMerge } from 'tailwind-merge'

export interface LoginCredentials {
  email: string
  password: string
}

export interface PlaceTagFilters {
  type: Record<'adventure' | 'beach' | 'city', boolean>
  temperature: Record<'hot' | 'cold' | 'temperate', boolean>
  flight: Record<'short' | 'medium' | 'long', boolean>
}

export type PlaceTag = Record<'type' | 'temperature' | 'flight', string>

export interface Place {
  id?: string
  name: string
  description: string
  img: string
  visited: string
  visitedDate: string
  tags: PlaceTag
}

export const defaultPlace: Place = {
  name: '',
  description: '',
  img: '',
  visited: 'No',
  visitedDate: '',
  tags: {
    type: '',
    temperature: '',
    flight: ''
  }
}

export const defaultTagFilters: PlaceTagFilters = {
  type: {
    adventure: false,
    beach: false,
    city: false
  },
  temperature: {
    hot: false,
    cold: false,
    temperate: false
  },
  flight: {
    long: false,
    medium: false,
    short: false
  }
}

export const slugify = (str: string) => {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export const snapshotToArray = (querySnapshot: QuerySnapshot<DocumentData>) => {
  if (!querySnapshot.docs?.length) {
    throw new Error('No docs found!!')
  }

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Place)
  }))
}

export const DestinationCategories = {
  BUCKET_LIST: 'bucketList',
  VISITED: 'visited'
}

export const iconByCategoryFilter = {
  type: 'pin',
  temperature: 'sun',
  flight: 'airplane'
}

export const cn = (
  ...classNames: Array<
    string | undefined | Record<string, string | boolean | undefined>
  >
) => twMerge(clsx(classNames))
