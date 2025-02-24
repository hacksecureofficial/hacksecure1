import { NextRequest, NextResponse } from 'next/server'
import certifications from '../../../data/certificates.json' // Import certifications data

// Handle GET requests to /api/achievements
export async function GET(req: NextRequest) {
  const userId = req.cookies.get('userId')?.value // Get userId from cookies

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }) // Return 401 if no userId
  }

  // Filter certifications for the logged-in user
  const userAchievements = certifications.filter(
    (certification) => certification.userId === userId
  )

  return NextResponse.json(userAchievements, { status: 200 }) // Return user's achievements
}
