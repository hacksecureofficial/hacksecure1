import { promises as fs } from "fs"
import { NextResponse } from "next/server"
import path from "path"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./route"

const dataDirectory = path.join(process.cwd(), "data")

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const certificateId = params.id
    const certificateData = await fs.readFile(path.join(dataDirectory, "certificates.json"), "utf8")
    const certificates = JSON.parse(certificateData || "[]")

    const certificate = certificates.find((cert: { id: string; userId: string }) => cert.id === certificateId)
    if (!certificate || certificate.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const imageBuffer = Buffer.from(certificate.imageData, "base64")
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "private, max-age=3600",
      },
    })
  } catch (error) {
    console.error("Failed to retrieve certificate image:", error)
    return NextResponse.json({ error: "Failed to retrieve certificate image" }, { status: 500 })
  }
}
