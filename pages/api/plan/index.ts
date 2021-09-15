import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../dbConnect";
import { Plan, ResourceDocument } from "../../../models";
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
        resources: plan.resources
          .map(r => {
            const resource: ResourceDocument = r.resource as ResourceDocument
            return {
              resource,
              link: resource.links.find(link => link.resourceType === r.resourceType)
            }
          })
          .filter(({ link }) => !! link)
          .map(({ link, resource }) => ({
            id: resource._id,
            name: resource.name,
            url: link.url,
            resourceType: link.resourceType
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
