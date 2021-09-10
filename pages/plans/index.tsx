import * as React from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'
import { GetPlansResponseDTO } from '../api/plans'

export default function ResourcesPage() {
  const { status, data } = useQuery('plans', async () => {
    const request = await fetch('/api/plans')
    const body = await request.json() as GetPlansResponseDTO
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
          <h1 className="text-xl font-bold mb-4">Plans</h1>
          <table>
            <thead>
              <tr>
                <th className="px-2 border">Name</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td colSpan={4} className="px-2 border">
                  <Link href="/resources/new">
                    <a className="text-blue-600 hover:underline focus:underline">
                      + Add Resource
                    </a>
                  </Link>
                </td>
              </tr> */}
              {
                (data ?? []).map(plan => (
                  <tr key={plan.id}>
                    <td className="px-2 border">
                      <Link href={`/plans/${plan.id}`}>
                        <a className="text-blue-600 hover:underline focus:underline">
                          {plan.name}
                        </a>
                      </Link>
                    </td>
                    {/* <td className="px-2 border">
                      <Link href={`/resources/${plan.id}/edit`}>
                        <a className="text-blue-600 hover:underline focus:underline">Edit</a>
                      </Link>
                    </td> */}
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
