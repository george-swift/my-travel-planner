'use client'

import { ChangeEvent, useState } from 'react'

import eventBus from '@/lib/eventbus'
import { login } from '@/lib/auth'

import { Button, Input, Modal } from '@/components'

interface Props {
  isOpen: boolean
}

export default function SignInForm({ isOpen }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isErrorShown, setIsErrorShown] = useState(false)
  const [inputs, setInputs] = useState({ email: '', password: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsErrorShown(false)
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const closeModal = () => eventBus.emit('closeAuthModal')

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)
    try {
      await login(inputs)
      closeModal()
    } catch (e) {
      console.error('📣: Sign in error', e)
      setIsErrorShown(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      title="Sign in to your account"
      isOpen={isOpen}
      onClose={closeModal}
      isErrorShown={isErrorShown}
    >
      <form className="space-y-6" onSubmit={onSubmit}>
        <Input
          label="Email address"
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Your email"
          required={true}
        />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="*********"
          required={true}
        />

        <div>
          <Button
            type="submit"
            text="Sign in"
            className="flex w-full justify-center py-2 px-3 text-white bg-teal-600 hover:bg-teal-500 font-semibold"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </Modal>
  )
}
