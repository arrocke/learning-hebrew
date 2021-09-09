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
                <th className="px-2 border">URL</th>
                <th className="px-2 border">Resource Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={3} className="px-2 border">
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
                    <td className="px-2 border">
                      <a href={resource.url} target="_blank" className="text-blue-600 hover:underline focus:underline">
                        {resource.url}
                      </a>
                    </td>
                    <td className="px-2 border">{resource.resourceType}</td>
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
