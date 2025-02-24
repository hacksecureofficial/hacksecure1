import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const USERS_FILE_PATH = path.join(process.cwd(), "data", "users.json")

async function readUsersFile() {
  const data = await fs.readFile(USERS_FILE_PATH, "utf8")
  return JSON.parse(data)
}

async function writeUsersFile(users) {
  await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2))
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 })
    }

    const users = await readUsersFile()
    const userIndex = users.findIndex((user) => user.verificationToken === token)

    if (userIndex === -1) {
      return NextResponse.json({ error: "Invalid verification token" }, { status: 400 })
    }

    users[userIndex].verified = true
    delete users[userIndex].verificationToken

    await writeUsersFile(users)

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in email verification:", error)
    return NextResponse.json({ error: "An error occurred during email verification" }, { status: 500 })
  }
}

