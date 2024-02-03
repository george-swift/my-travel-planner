'use client'

import Link from 'next/link'

import { useAuth } from '../provider'
import eventBus from '@/lib/eventbus'

import { Button, Icon } from '@/components'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const { user } = useAuth()

  const navigation = [
    {
      text: 'Add place',
      onClick: () => eventBus.emit('addPlace')
    },
    {
      text: user ? 'Sign Out' : 'Sign In',
      onClick: () => eventBus.emit(user ? 'logout' : 'login')
    }
  ]

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-6 py-5 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-2 rounded-md bg-teal-100">
            <span className="sr-only">My Travel Planner</span>
            <Icon name="airplane" />
          </Link>
        </div>
        <div className="flex gap-x-6 lg:gap-x-12">
          {navigation.map(({ text, onClick }, index) => (
            <Button
              key={text}
              text={text}
              className={cn('py-1 font-semibold leading-6 text-gray-900', {
                'text-white bg-teal-600 hover:bg-teal-500': index > 0
              })}
              onClick={onClick}
            />
          ))}
        </div>
      </nav>
    </header>
  )
}
