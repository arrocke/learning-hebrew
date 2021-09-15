import * as React from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { GetPlanResponseDTO } from '../api/plan'
import { GetResourcesResponseDTO } from '../api/resources'
import ResourceType from '../../types/ResourceType'

export default function PlanPage() {
  // TODO: Develop custom state without resource metadata.
  const [state, setState] = React.useState<GetPlanResponseDTO>()

  const { status: planStatus } = useQuery('plan', async () => {
    const request = await fetch(`/api/plan`)
    const body = await request.json() as GetPlanResponseDTO
    return body
  }, {
    onSuccess(data) {
      setState(data)
    }
  })

  const { status: resourceStatus, data: resourceData } = useQuery('resources', async () => {
    const request = await fetch(`/api/resources`)
    const body = await request.json() as GetResourcesResponseDTO
    return body
  })

  if (planStatus === 'loading' || resourceStatus === 'loading') {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      // TODO: submit changes to API.
      <form onSubmit={() => {}}>
        <h1 className="text-xl font-bold mb-4">Plan</h1>
        <button className="text-blue-600 hover:underline focus:underline">
          Save
        </button>
        <table>
          <thead>
            <tr>
              <th className="px-2 border">Resource</th>
              <th className="px-2 border">Type</th>
              <th className="px-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {
              (state?.resources ?? []).map((resource, i) => (
                <tr key={i}>
                  <td className="px-2 border">
                    <select
                      value={resource.id}
                      onChange={(e) => {
                        setState(state => {
                          const resources = state.resources.slice()
                          resources[i] = {
                            ...resources[i],
                            id: e.target.value
                          }
                          return { ...state, resources }
                        })
                      }}
                    >
                      {
                        resourceData?.map(resource => (
                          <option value={resource.id} key={resource.id}>
                            {resource.name}
                          </option>
                        ))
                      }
                    </select>
                  </td>
                  <td className="px-2 border">
                    {/* TODO: Show resource types for selected resource. */}
                    <select
                      value={resource.resourceType}
                      onChange={(e) => {
                        setState(state => {
                          const resources = state.resources.slice()
                          resources[i] = {
                            ...resources[i],
                            resourceType: e.target.value as ResourceType
                          }
                          return { ...state, resources }
                        })
                      }}
                    >
                      <option value={ResourceType.Video}>video</option>
                      <option value={ResourceType.Audio}>audio</option>
                      <option value={ResourceType.Text}>text</option>
                    </select>
                  </td>
                  <td className="px-2 border">
                    <button
                      className="text-blue-600 hover:underline focus:underline"
                      onClick={() => {
                        setState(state => {
                          const resources = state.resources.slice()
                          resources.splice(i, 0, state.resources[i]) 
                          return { ...state, resources }
                        })
                      }}
                    >
                      Insert
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </form>
    )
  }
}

