import * as React from 'react'
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
          <table>
            <thead>
              <tr>
                <th className="px-2 border"></th>
                <th className="px-2 border">Resource</th>
              </tr>
            </thead>
            <tbody>
              {
                (data?.resources ?? []).map(plan => (
                  <tr key={plan.id}>
                    <td className="px-2 border">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 border">{plan.name}</td>
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

