import { NextApiRequest, NextApiResponse } from 'next'
import certifications from '../../data/certificates.json' // Import certifications data

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.cookies // Get userId from cookies (authentication assumed)

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' }) // If no userId, return unauthorized
  }

  // Filter certifications based on logged-in user's userId
  const userAchievements = certifications.filter(
    (certification) => certification.userId === userId
  )

  return res.status(200).json(userAchievements) // Return filtered data
}
