'use client'

import { Fragment, ReactNode } from 'react'
import { Transition, Dialog } from '@headlessui/react'

import Button from './button'
import Icon from './icons'

interface Props {
  isOpen: boolean
  onClose: () => void
  isErrorShown: boolean
  title: string
  children: ReactNode | ReactNode[]
}

const Modal = ({ isOpen, onClose, isErrorShown, title, children }: Props) => (
  <Transition.Root show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white min-w-[320px] p-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[475px]">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <Button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close </span>
                  <Icon name="cancel" />
                </Button>
              </div>
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-teal-100">
                  <Icon name="airplane" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                </div>
              </div>
              <div className="mb-3 py-4 min-w-[320px] sm:px-4">
                {isErrorShown && <p>Something went wrong!</p>}

                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
)

export default Modal
