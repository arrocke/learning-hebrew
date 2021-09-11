import * as React from 'react'
import { useRouter } from 'next/dist/client/router'
import { useMutation } from 'react-query'
import ResourceType from '../../types/ResourceType'
import ResourceForm, { ResourceState } from '../../components/ResourceForm'

export default function NewResourcePage() {
  const router = useRouter()
  const [state, setState] = React.useState<ResourceState>({
    name: '',
    links: []
  })
  const { mutate } = useMutation((resource: { name: string, url: string, resourceType: ResourceType }) => {
    return fetch(
      `/api/resources`,
      {
        method: 'POST',
        body: JSON.stringify(resource)
      }
    )
  }, {
    onSuccess() {
      router.push(`/resources`)
    }
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutate(Object.fromEntries(new FormData(e.currentTarget)) as any)
  }

  return <div>
    <h1 className="text-xl font-bold mb-4">New Resource</h1>
    <ResourceForm
      create
      state={state}
      onChange={setState}
      onSubmit={() => mutate(state) }
    />
  </div>
}

