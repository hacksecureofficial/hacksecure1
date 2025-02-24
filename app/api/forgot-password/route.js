import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { sendMail } from "@/utils/mailer"

const USERS_FILE_PATH = path.join(process.cwd(), "data", "users.json")

async function readUsersFile() {
  const data = await fs.readFile(USERS_FILE_PATH, "utf8")
  return JSON.parse(data)
}

async function writeUsersFile(users) {
  await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2))
}

export async function POST(request) {
  try {
    const { email } = await request.json()
    console.log("Forgot password request for email:", email)

    const users = await readUsersFile()
    const user = users.find((u) => u.email === email)

    if (!user) {
      console.log("User not found:", email)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const resetToken = uuidv4()
    user.resetToken = resetToken
    user.resetTokenExpiry = Date.now() + 3600000 // Token expires in 1 hour

    await writeUsersFile(users)

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`
    console.log("Reset link generated:", resetLink)

    await sendMail({
      to: email,
      subject: "Reset your password",
      html: `
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      `,
    })

    console.log("Password reset email sent to:", email)
    return NextResponse.json({ message: "Password reset email sent" }, { status: 200 })
  } catch (error) {
    console.error("Error in forgot password:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}

