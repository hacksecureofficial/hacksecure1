import { promises as fs } from "fs"
import { NextResponse } from "next/server"
import path from "path"

const dataDirectory = path.join(process.cwd(), "data")

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  try {
    const testData = await fs.readFile(path.join(dataDirectory, "test.json"), "utf8")
    const attempts = JSON.parse(testData || "[]")
    const userAttempts = attempts.filter((attempt) => attempt.userId === userId)

    return NextResponse.json({ attempts: userAttempts })
  } catch (error) {
    if (error.code === "ENOENT") {
      return NextResponse.json({ attempts: [] })
    }
    throw error
  }
}

export async function POST(request) {
  const data = await request.json()

  try {
    let testData = []
    try {
      const fileContent = await fs.readFile(path.join(dataDirectory, "test.json"), "utf8")
      testData = JSON.parse(fileContent)
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error
      }
    }

    testData.push({
      id: crypto.randomUUID(),
      userId: data.userId,
      score: data.score,
      date: new Date().toISOString(),
      passed: data.score >= 8,
    })

    await fs.writeFile(path.join(dataDirectory, "test.json"), JSON.stringify(testData, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save test attempt" }, { status: 500 })
  }
}
