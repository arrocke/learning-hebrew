import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { useMutation, useQuery } from 'react-query'
import ResourceType from '../../../types/ResourceType'
import { GetPlanResponseDTO } from '../../api/plans/[id]'

export default function EditResourcePage() {
  const router = useRouter()

  const { status, data } = useQuery(['plan', router.query.id], async ({ queryKey }) => {
    if (queryKey[1]) {
      const request = await fetch(`/api/plans/${queryKey[1]}`)
      const body = await request.json() as GetPlanResponseDTO
      return body
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
          <h1 className="text-xl font-bold mb-4">{data?.name}</h1>
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

