'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useLayoutEffect, useState, useTransition } from 'react'

import eventBus from '@/lib/eventbus'
import { addPlace, deletePlace } from '@/lib/firestore'

import {
  Button,
  Input,
  Modal,
  RadioGroup,
  Select,
  Textarea
} from '@/components'
import { Place } from '@/lib/utils'

interface Props {
  isOpen: boolean
  isEditMode: boolean
  placeToEdit: Place
  isUserLoggedIn: boolean
}

export default function PlaceForm({
  isOpen,
  isEditMode,
  placeToEdit,
  isUserLoggedIn
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const [isErrorShown, setIsErrorShown] = useState(false)
  const [inputs, setInputs] = useState(placeToEdit)

  const isMutating = isFetching || isPending

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setIsErrorShown(false)

    setInputs(inputs => {
      const { name, value } = e.target
      const isTag = value.substring(0, 4) === 'tag-'

      if (!isTag) return { ...inputs, [name]: value }

      const tagVal = isTag ? value.substring(4) : ''

      const tags = {
        type: name === 'type' ? tagVal : inputs.tags.type,
        temperature: name === 'temperature' ? tagVal : inputs.tags.temperature,
        flight: name === 'flight' ? tagVal : inputs.tags.flight
      }

      return { ...inputs, tags }
    })
  }

  const closeModal = () => eventBus.emit('closePlaceModal')

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsFetching(true)
    try {
      await addPlace(inputs)
      closeModal()
      setIsFetching(false)
      startTransition(() => {
        router.refresh()
      })
    } catch {
      setIsErrorShown(true)
      setIsFetching(false)
    }
  }

  const onDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this place?')) return

    setIsFetching(true)
    try {
      await deletePlace(inputs)
      closeModal()
      setIsFetching(false)
      startTransition(() => {
        router.refresh()
      })
    } catch {
      setIsErrorShown(true)
      setIsFetching(false)
    }
  }

  useLayoutEffect(() => {
    setInputs(placeToEdit)
  }, [placeToEdit])

  return (
    <Modal
      title={isEditMode ? 'Edit place info' : 'Add a new place'}
      isOpen={isOpen}
      onClose={closeModal}
      isErrorShown={isErrorShown}
    >
      <form className="space-y-6" onSubmit={onSubmit}>
        <Input
          label="Name"
          id="name"
          name="name"
          type="text"
          value={inputs.name}
          onChange={handleChange}
          placeholder="Marbella"
          required={true}
        />

        <Textarea
          label="Description"
          id="description"
          name="description"
          value={inputs.description}
          onChange={handleChange}
          placeholder="I want to go here next summer"
        />

        <Input
          label="Image URL"
          id="img"
          name="img"
          type="url"
          value={inputs.img}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/photo-xyz"
        />

        <div className="flex flex-wrap gap-3">
          <Select
            id="visited"
            name="visited"
            label="Been there?"
            defaultValue={inputs.visited}
            onBlur={handleChange}
            options={['Yes', 'No']}
            wrapperClasses="w-full md:w-[48%]"
          />

          <Input
            label="Date visited"
            id="visitedDate"
            name="visitedDate"
            type="text"
            placeholder="mm/dd/yyyy"
            value={inputs.visitedDate}
            onChange={handleChange}
            wrapperClasses="w-full md:w-[48%]"
          />
        </div>

        <div>
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Tags
          </span>
          <RadioGroup onChange={handleChange} checkedItems={inputs.tags} />
        </div>

        <div className="flex flex-wrap gap-2.5">
          {isUserLoggedIn ? (
            <>
              {isEditMode && (
                <Button
                  type="button"
                  text="Delete"
                  className="bg-white w-[48%] py-2.5 px-3.5 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={onDelete}
                  disabled={isMutating}
                />
              )}

              <Button
                type="submit"
                text={isEditMode ? 'Save changes' : 'Add place'}
                className="w-[48%] py-2 px-3 bg-yellow-400 hover:bg-yellow-500 font-semibold"
                disabled={isMutating}
              />
            </>
          ) : (
            <Button
              type="button"
              text="Sign in to edit"
              onClick={() => eventBus.emit('login')}
              className="flex w-full justify-center py-2 px-3 bg-yellow-400 hover:bg-yellow-500 font-semibold"
              disabled={isMutating}
            />
          )}
        </div>
      </form>
    </Modal>
  )
}
