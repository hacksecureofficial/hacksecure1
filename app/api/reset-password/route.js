import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import bcrypt from "bcryptjs"

const USERS_FILE_PATH = path.join(process.cwd(), "data", "users.json")

async function readUsersFile() {
  const data = await fs.readFile(USERS_FILE_PATH, "utf8")
  return JSON.parse(data)
}

async function writeUsersFile(users) {
  await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2))
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  console.log("GET request received with token:", token)

  if (!token) {
    console.log("Token is missing")
    return NextResponse.json({ error: "Token is required" }, { status: 400 })
  }

  try {
    const users = await readUsersFile()
    console.log("Users data:", JSON.stringify(users, null, 2))

    const user = users.find((u) => u.resetToken === token && u.resetTokenExpiry > Date.now())

    if (!user) {
      console.log("Invalid or expired token")
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    console.log("Valid token found for user:", user.email)
    return NextResponse.json({ message: "Token is valid" })
  } catch (error) {
    console.error("Error in reset password GET:", error)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { token, password } = await request.json()
    console.log("POST request received with token:", token)

    const users = await readUsersFile()
    const userIndex = users.findIndex((u) => u.resetToken === token && u.resetTokenExpiry > Date.now())

    if (userIndex === -1) {
      console.log("Invalid or expired reset token")
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    users[userIndex].password = hashedPassword
    delete users[userIndex].resetToken
    delete users[userIndex].resetTokenExpiry

    await writeUsersFile(users)

    console.log("Password reset successfully for user:", users[userIndex].email)
    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in reset password POST:", error)
    return NextResponse.json({ error: "An error occurred while resetting the password" }, { status: 500 })
  }
}

