'use client'

import Image from 'next/image'
import { Button } from '@/components'

import { Container } from '@/components'

export default function Hero() {
  const scroll = () => {
    const section = document.querySelector('#placePicker')
    section!.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Container className="relative isolate overflow-hidden pt-14 max-w-none">
      <Image
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src="/takeoff.jpg"
        alt="Jet taking off"
        fill={true}
        quality={100}
        priority
      />

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-100 ring-1 ring-white/10 hover:ring-white/20">
            Discover some other things I&apos;ve built.{' '}
            <a
              href="https://www.ubonggeorge.com"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap font-semibold text-white"
            >
              <span className="absolute inset-0" aria-hidden="true" />
              See more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Travel Planner
          </h1>
          <p className="mt-6 max-w-[315px] mx-auto text-lg leading-8 text-gray-100 tablet:max-w-[500px]">
            Designed for organizing my bucket list. I can add my next favorite
            destination in just a few clicks!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              text="Get Started"
              onClick={scroll}
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-50"
            />
          </div>
        </div>
      </div>
    </Container>
  )
}
