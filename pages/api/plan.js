// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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

export default function helloAPI(req, res) {
  res.status(200).json(plan)
}
