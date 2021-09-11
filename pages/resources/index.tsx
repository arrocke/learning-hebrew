import * as React from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'
import { GetResourcesResponseDTO } from '../api/resources'

export default function ResourcesPage() {
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
          <h1 className="text-xl font-bold mb-4">Resources</h1>
          <table>
            <thead>
              <tr>
                <th className="px-2 border">Name</th>
                <th className="px-2 border">Resource Types</th>
                <th className="px-2 border"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="px-2 border">
                  <Link href="/resources/new">
                    <a className="text-blue-600 hover:underline focus:underline">
                      + Add Resource
                    </a>
                  </Link>
                </td>
              </tr>
              {
                (data ?? []).map(resource => (
                  <tr key={resource.id}>
                    <td className="px-2 border">{resource.name}</td>
                    <td className="px-2 border">{(resource.resourceTypes ?? []).join(', ')}</td>
                    <td className="px-2 border">
                      <Link href={`/resources/${resource.id}/edit`}>
                        <a className="text-blue-600 hover:underline focus:underline">Edit</a>
                      </Link>
                    </td>
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
