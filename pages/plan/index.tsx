import * as React from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { GetPlanResponseDTO } from '../api/plan'

export default function PlanPage() {
  const { status, data } = useQuery('plan', async ({ queryKey }) => {
    const request = await fetch(`/api/plan`)
    const body = await request.json() as GetPlanResponseDTO
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
          <h1 className="text-xl font-bold mb-4">Plan</h1>
          <Link href={`/plan/edit`}>
            <a className="text-blue-600 hover:underline focus:underline">
              Edit
            </a>
          </Link>
          <table>
            <thead>
              <tr>
                <th className="px-2 border"></th>
                <th className="px-2 border">Resource</th>
                <th className="px-2 border">Type</th>
              </tr>
            </thead>
            <tbody>
              {
                (data?.resources ?? []).map((resource, i) => (
                  <tr key={i}>
                    <td className="px-2 border">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 border">
                      <a
                        href={resource.url}
                        className="text-blue-600 hover:underline focus:underline"
                        target="_blank"
                      >
                        {resource.name}
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
  }
}

