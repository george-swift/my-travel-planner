'use client'

import Link from 'next/link'

import { useAuth } from '../provider'
import eventBus from '@/lib/eventbus'

import { Button, Icon } from '@/components'

export default function Navigation() {
  const { user } = useAuth()

  const navigation = [
    {
      text: 'Add place',
      onClick: () => eventBus.emit('addPlace')
    },
    {
      text: user ? 'Log out' : 'Log in',
      onClick: () => eventBus.emit(user ? 'logout' : 'login')
    }
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            href="#"
            className="-m-1.5 p-2 rounded-md text-gray-100 ring-1 ring-white/10 hover:ring-white/20"
          >
            <span className="sr-only">My Travel Planner</span>
            <Icon name="airplane" />
          </Link>
        </div>

        <div className="flex gap-x-6 lg:gap-x-12">
          {navigation.map(({ text, onClick }) => (
            <Button
              key={text}
              text={text}
              className="py-1 font-semibold leading-6 text-white hover:ring-1 hover:ring-white/20"
              onClick={onClick}
            />
          ))}
        </div>
      </nav>
    </header>
  )
}
