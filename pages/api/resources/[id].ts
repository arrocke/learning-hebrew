import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../dbConnect";
import Resource from "../../../models/Resource";
import ResourceType from "../../../types/ResourceType";

export type GetResourceResponseDTO = {
  id: string
  name: string
  links: {
    resourceType: ResourceType,
    url: string
  }[]
}

export default async function(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  switch (req.method) {
    case 'GET': {
      const resource = await Resource.findById(req.query.id) 
      const dto: GetResourceResponseDTO = {
        id: resource._id.toHexString(),
        name: resource.name,
        links: resource.links.map(link => ({
          resourceType: link.resourceType,
          url: link.url
        }))
      }
      res.status(200).json(dto)
      break
    }
    case 'PUT': {
      await Resource.findByIdAndUpdate(req.query.id, JSON.parse(req.body))
      res.status(204).end('No Content')
      break
    }
    case 'DELETE': {
      await Resource.findByIdAndDelete(req.query.id)
      res.status(204).end('No Content')
      break
    }
    default: {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
    }
  }
}
