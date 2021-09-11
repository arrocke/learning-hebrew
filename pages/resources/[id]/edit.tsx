import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { useMutation, useQuery } from 'react-query'
import ResourceForm, { ResourceState } from '../../../components/ResourceForm'
import ResourceType from '../../../types/ResourceType'
import { GetResourceResponseDTO } from '../../api/resources/[id]'

export default function EditResourcePage() {
  const router = useRouter()
  const [state, setState] = React.useState<ResourceState>()

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

  const { mutate } = useMutation((resource: ResourceState) => {
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

  switch (status) {
    case 'loading':
      return (
        <div>Loading...</div>
      )
    case 'success': {
      return (
        <div>
          <h1 className="text-xl font-bold mb-4">Edit Resource</h1>
          { state && 
            <ResourceForm
              state={state}
              onChange={setState}
              onSubmit={() => mutate(state)}
            />
          }
        </div>
      )
    }
  }
}

