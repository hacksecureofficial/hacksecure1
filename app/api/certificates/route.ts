import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

// Path for certificate data
const CERTIFICATES_FILE_PATH = path.join(process.cwd(), "data", "certificates.json")
const dataDirectory = path.join(process.cwd(), "data")

// GET handler to fetch certificates (with JWT authentication)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userIdFromQuery = searchParams.get("userId")
  const token = cookies().get("token")?.value

  try {
    // If the token exists, try verifying it
    if (token) {
      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret) {
        console.error("JWT_SECRET is not set in the environment variables")
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
      }

      let decoded
      try {
        decoded = jwt.verify(token, jwtSecret)
      } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
      }

      const userId = decoded.userId

      // Read the certificates from the file
      const certificateData = await fs.readFile(CERTIFICATES_FILE_PATH, "utf8")
      const certificates = JSON.parse(certificateData || "[]")

      // Filter certificates based on the current userId
      const userCertificates = certificates.filter((certificate: any) => certificate.userId === userId)

      return NextResponse.json({ certificates: userCertificates })
    } 

    // If no token, check for userId from query params
    else if (userIdFromQuery) {
      const certificateData = await fs.readFile(path.join(dataDirectory, "certificates.json"), "utf8")
      const certificates = JSON.parse(certificateData || "[]")
      const userCertificates = certificates.filter((certificate: any) => certificate.userId === userIdFromQuery)
      
      return NextResponse.json({ certificates: userCertificates })
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  } catch (error) {
    console.error("Error reading certificates:", error)
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 })
  }
}

// POST handler to save a new certificate
export async function POST(request: Request) {
  const data = await request.json()

  try {
    let certificateData = []
    try {
      const fileContent = await fs.readFile(path.join(dataDirectory, "certificates.json"), "utf8")
      certificateData = JSON.parse(fileContent)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error
      }
    }

    const newCertificate = {
      id: crypto.randomUUID(),
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      date: data.date,
      score: data.score,
      imageUrl: data.imageUrl,
    }

    certificateData.push(newCertificate)

    await fs.writeFile(path.join(dataDirectory, "certificates.json"), JSON.stringify(certificateData, null, 2))

    return NextResponse.json({ success: true, certificate: newCertificate })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save certificate" }, { status: 500 })
  }
}
