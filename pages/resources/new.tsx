import * as React from 'react'
import { useMutation } from 'react-query'
import ResourceType from '../../types/ResourceType'

export default function NewResourcePage() {
  const { mutate } = useMutation((resource: { name: string, url: string, resourceType: ResourceType }) => {
    return fetch(
      `/api/resources`,
      {
        method: 'POST',
        body: JSON.stringify(resource)
      }
    )
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate(Object.fromEntries(new FormData(e.currentTarget)) as any)
  }

  return <div>
    <h1 className="text-xl font-bold mb-4">New Resource</h1>
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <label htmlFor="resource-name" className="mr-2">Name</label>
        <input
          id="resource-name"
          name="name"
          type="text"
          className="border w-96"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="resource-url" className="mr-2">URL</label>
        <input
          id="resource-url"
          name="url"
          type="text"
          className="border w-96"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="resource-type" className="mr-2">Resource Type</label>
        <select
          id="resource-type"
          className="border"
          name="resourceType"
        >
          <option value="video">video</option>
          <option value="audio">audio</option>
          <option value="text">text</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-black rounded text-white py-2 px-4 border-2 border-black
        focus:bg-white focus:text-black"
      >
        Create Resource
      </button>
    </form>
  </div>
}

