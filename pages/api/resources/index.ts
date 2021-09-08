import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../dbConnect";
import Resource from "../../../models/Resource";
import ResourceType from "../../../types/ResourceType";

export type GetResourcesResponseDTO = {
  id: string
  name: string
  url: string
  resourceType: ResourceType
}[]

export default async function(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  switch (req.method) {
    case 'GET': {
      const resources = await Resource.find() 
      const dto: GetResourcesResponseDTO = resources.map(resource => ({
        id: resource._id.toHexString(),
        name: resource.name,
        url: resource.url,
        resourceType: resource.resourceType
      }))
      res.status(200).json(dto)
      break
    }
    case 'POST': {
      const resource = await Resource.create(req.body)
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