// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"

const plan = [
  {
    id: 1,
    name: 'Aleph with Beth Lesson 1',
    url: 'https://youtube.com',
    resourceType: 'video'
  },
  {
    id: 2,
    name: 'Aleph with Beth Lesson 1',
    url: 'https://drive.google.com',
    resourceType: 'text'
  },
  {
    id: 3,
    name: 'Aleph with Beth Lesson 1',
    url: 'https://spotify.com',
    resourceType: 'audio'
  }
]

export default function helloAPI(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(plan)
}
