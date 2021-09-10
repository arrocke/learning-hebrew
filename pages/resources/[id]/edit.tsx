import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { useMutation, useQuery } from 'react-query'
import ResourceType from '../../../types/ResourceType'
import { GetResourceResponseDTO } from '../../api/resources/[id]'

export default function EditResourcePage() {
  const router = useRouter()
  const [state, setState] = React.useState<any>({})

  const { status, data } = useQuery(['resources', router.query.id], async ({ queryKey }) => {
    if (queryKey[1]) {
      const request = await fetch(`/api/resources/${queryKey[1]}`)
      const body = await request.json() as GetResourceResponseDTO
      return body
    }
  }, {
    onSuccess(data) {
      setState(data)
    }
  })

  const { mutate } = useMutation((resource: { id: string, name: string, url: string, resourceType: ResourceType }) => {
    const { id, ...data } = resource
    return fetch(
      `/api/resources/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data)
      }
    )
  }, {
    onSuccess() {
      router.push(`/resources`)
    }
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate({
      id: router.query.id,
      ...(Object.fromEntries(new FormData(e.currentTarget)) as any)
    })
  }

  switch (status) {
    case 'loading':
      return (
        <div>Loading...</div>
      )
    case 'success': {
      return (
        <div>
          <h1 className="text-xl font-bold mb-4">Edit Resource</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-2">
              <label htmlFor="resource-name" className="mr-2">Name</label>
              <input
                id="resource-name"
                name="name"
                type="text"
                className="border w-96"
                value={state.name}
                onChange={e => setState(state => ({ ...state, name: e.target.value }))}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="resource-url" className="mr-2">URL</label>
              <input
                id="resource-url"
                name="url"
                type="text"
                className="border w-96"
                value={state.url}
                onChange={e => setState(state => ({ ...state, url: e.target.value }))}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="resource-type" className="mr-2">Resource Type</label>
              <select
                id="resource-type"
                className="border"
                name="resourceType"
                value={state.resourceType}
                onChange={e => setState(state => ({ ...state, resourceType: e.target.value }))}
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
              Update Resource
            </button>
          </form>
        </div>
      )
    }
  }
}

