// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../dbConnect"
import Plan from "../../../models/Plan"

export type GetPlansResponseDTO = {
  id: string
  name: string
}[]

export default async function(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  switch (req.method) {
    case 'GET': {
      const plans = await Plan.find() 
      const dto: GetPlansResponseDTO = plans.map(plan => ({
        id: plan._id.toHexString(),
        name: plan.name,
        a: plan.resources[0].resource
      }))
      res.status(200).json(dto)
      break
    }
    default: {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
    }
  }
}
