'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

import { Button, Card, Container, RadioGroup } from '@/components'
import {
  defaultTagFilters,
  Place,
  PlaceTag,
  PlaceTagFilters
} from '@/lib/utils'
import { getPlacesByTags } from '@/lib/firestore'

export default function PlacePicker() {
  const [tags, setTags] = useState<PlaceTag | PlaceTagFilters>(
    defaultTagFilters
  )
  const [isFilterSelected, setIsFilterSelected] = useState(false)
  const [destination, setDestination] = useState<Place | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowError(false)
    setIsFilterSelected(true)
    setTags(tags => ({ ...tags, [e.target.name]: e.target.value.substring(4) }))
  }

  const queryPlaces = async () => {
    if (
      !Array.from(document.querySelectorAll('input[type="radio"]')).some(
        input => (input as HTMLInputElement).checked
      )
    ) {
      return
    }

    try {
      setShowError(false)
      setIsLoading(true)
      setDestination(null)

      const places = await getPlacesByTags(tags)

      if (!places?.length) {
        console.warn('No matching places')
        setTimeout(() => {
          setShowError(true)
          setIsLoading(false)
          setDestination(null)
        }, 1000)
        return
      }

      const placeToGo = places[Math.floor(Math.random() * places.length)]

      setTimeout(() => {
        setIsLoading(false)
        setDestination(placeToGo)
      }, 4000)
    } catch (e) {
      console.error(e)
    }
  }

  const clearFilters = () => {
    Array.from(document.querySelectorAll('input[type="radio"]')).forEach(
      input => {
        if ((input as HTMLInputElement).checked)
          (input as HTMLInputElement).checked = false
      }
    )
    setTags(defaultTagFilters)
  }

  return (
    <Container
      element="section"
      id="placePicker"
      className="px-6 py-8 md:flex md:justify-between lg:mt-12 lg:px-8 lg:pr-0"
    >
      <form className="pb-3 tablet:w-1/2 tablet:order-1">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          This year I&apos;m going to...
        </h2>

        <RadioGroup onChange={handleChange} />

        <div className="mt-5 flex justify-center gap-2.5 md:justify-start">
          <Button
            text="Show match"
            className="bg-yellow-400 py-2.5 px-3.5 font-semibold text-gray-900 shadow-sm hover:bg-yellow-500"
            onClick={queryPlaces}
            disabled={isLoading}
          />

          {isFilterSelected && (
            <Button
              text="Clear filters"
              className="bg-white py-2.5 px-3.5 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={clearFilters}
            />
          )}
        </div>
      </form>

      <div className="mt-4 tablet:mt-0 tablet:w-1/2">
        {destination ? (
          <Card place={destination as Place} className="lg:w-[95%]" />
        ) : showError ? (
          <div className="flex justify-center items-center h-full rounded-lg bg-gray-200 text-gray-700 lg:w-[95%]">
            <p>Sorry, nothing matched those tags!</p>
          </div>
        ) : (
          <Image
            className="aspect-[3/2] object-cover rounded-lg lg:aspect-auto lg:h-full lg:w-[95%]"
            width={500}
            height={500}
            {...(isLoading ? { src: '/plane.gif' } : { src: '/plane.png' })}
            alt="Jet taking off"
          />
        )}
      </div>
    </Container>
  )
}
