'use client'

import { PropsWithChildren, useState } from 'react'

import { logout } from '@/lib/auth'
import eventBus from '@/lib/eventbus'
import { defaultPlace } from '@/lib/utils'
import { useAuth } from '../provider'

import { Container } from '@/components'
import SignInForm from './signInForm'
import PlaceForm from './placeForm'

export default function Home({ children }: PropsWithChildren) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [placeToEdit, setPlaceToEdit] = useState(defaultPlace)

  const { user } = useAuth()

  const openPlaceModal = (place = defaultPlace) => {
    setPlaceToEdit(place)
    setIsPlaceModalOpen(true)
  }

  eventBus.on('addPlace', () => {
    if (!user) return setIsAuthModalOpen(true)

    setIsEditMode(false)
    openPlaceModal()
    setIsAuthModalOpen(false)
  })

  eventBus.on('editPlace', place => {
    setIsEditMode(true)
    openPlaceModal(place)
  })

  eventBus.on('login', () => {
    setIsPlaceModalOpen(false)
    setIsAuthModalOpen(true)
  })

  eventBus.on('closePlaceModal', () => setIsPlaceModalOpen(false))

  eventBus.on('closeAuthModal', () => setIsAuthModalOpen(false))

  eventBus.on('logout', async () => await logout())

  return (
    <Container className="relative max-w-none">
      <SignInForm isOpen={isAuthModalOpen} />
      <PlaceForm
        isOpen={isPlaceModalOpen}
        isEditMode={isEditMode}
        placeToEdit={placeToEdit}
        isUserLoggedIn={!!user}
      />
      {children}
    </Container>
  )
}
