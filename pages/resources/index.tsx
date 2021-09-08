import * as React from 'react'
import { useQuery } from 'react-query'
import { GetResourcesResponseDTO } from '../api/resources'

export default function LearningProgressPage() {
  const { status, data } = useQuery('resources', async () => {
    const request = await fetch('/api/resources')
    const body = await request.json() as GetResourcesResponseDTO
    return body
  })

  switch (status) {
    case 'loading':
      return (
        <div>Loading...</div>
      )
    case 'success': {
      return (
        <div>
          <h1>Resources</h1>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>URL</td>
                <td>Resource Type</td>
              </tr>
            </thead>
            <tbody>
              {
                (data ?? []).map(resource => (
                  <tr key={resource.id}>
                    <td>{resource.name}</td>
                    <td>{resource.url}</td>
                    <td>{resource.resourceType}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )
    }
    default:
      return null
  }

}
