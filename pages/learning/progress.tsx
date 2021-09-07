import * as React from 'react'
import { format } from 'date-fns'
import { useMutation, useQuery } from 'react-query'

export default function LearningProgressPage() {
  const { status, data } = useQuery('plan', async () => {
    const request = await fetch('/api/plan')
    const body = await request.json()
    return body
  })

  const statusChangeMutation = useMutation(({ resourceId, status }: { resourceId: string, status: string }) => {
    return fetch(
      `/api/plan/resource/${resourceId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status })
      }
    )
  })

  switch (status) {
    case 'success': {
      if (!data) return null
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th className="px-2 border border-black"></th>
                <th className="px-2 border border-black">Resource</th>
                <th className="px-2 border border-black">Type</th>
                <th className="px-2 border border-black">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map(resource => <tr key={resource.id}>
                <td className="px-2 border border-black">
                  <input type="checkbox" onChange={e => statusChangeMutation.mutate({
                    resourceId: resource.id,
                    status: e.target.value ? 'complete' : 'incomplete' 
                  })}/>
                </td>
                <td className="px-2 border border-black">
                  <a href={resource.url} target="_blank" className="text-blue-600 hover:underline focus:underline">
                    {resource.name}
                  </a>
                </td>
                <td className="px-2 border border-black">{resource.resourceType}</td>
                <td className="px-2 border border-black">
                  {format(new Date, 'MM/dd/yyyy')}
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      )
    }
    default:
      return null
  }

}