import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../dbConnect";
import { Resource } from "../../../models";
import ResourceType from "../../../types/ResourceType";

export type GetResourcesResponseDTO = {
  id: string
  name: string,
  resourceTypes: ResourceType[]
}[]

export default async function(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  switch (req.method) {
    case 'GET': {
      const resources = await Resource.find().sort({ _id: 1 })
      const dto: GetResourcesResponseDTO = resources.map(resource => ({
        id: resource._id.toHexString(),
        name: resource.name,
        resourceTypes: resource.links.map(link => link.resourceType)
      }))
      res.status(200).json(dto)
      break
    }
    case 'POST': {
      const resource = await Resource.create(JSON.parse(req.body))
      res.setHeader('LOCATION', `${req.url}/${resource._id}`)
      res.status(201).end('Created')
      break
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
    }
  }
}