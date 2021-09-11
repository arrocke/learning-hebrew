import * as Mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../dbConnect";
import Plan, { PlanDocument } from "../../../models/Plan";
import Resource, { ResourceDocument } from "../../../models/Resource";
import ResourceType from "../../../types/ResourceType";

export type GetPlanResponseDTO = {
  resources: {
    id: string
    name: string,
    url: string,
    resourceType: ResourceType
  }[]
}

export default async function(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  switch (req.method) {
    case 'GET': {
      const plan = await Plan.findOne().populate('resources.resource')
      const dto: GetPlanResponseDTO = {
        resources: plan.resources.map(({ resource }) => ({
          id: resource.id,
          name: resource.name,
          url: resource.url,
          resourceType: resource.resourceType
        }))
      }
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
