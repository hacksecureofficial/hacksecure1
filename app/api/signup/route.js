import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import { sendMail } from "@/utils/mailer"

const USERS_FILE_PATH = path.join(process.cwd(), "data", "users.json")

async function readUsersFile() {
  try {
    const data = await fs.readFile(USERS_FILE_PATH, "utf8")
    return JSON.parse(data)
  } catch (error) {
    if (error.code === "ENOENT") {
      // If the file doesn't exist, return an empty array
      return []
    }
    throw error
  }
}

async function writeUsersFile(users) {
  await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2))
}

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    // Read existing users
    const users = await readUsersFile()

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email || user.name === name)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate verification token
    const verificationToken = uuidv4()

    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      vip_subscription: false,
      verified: false,
      verificationToken,
    }

    // Add new user to the array
    users.push(newUser)

    // Write updated users array back to file
    await writeUsersFile(users)

    // Send verification email
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${verificationToken}`
    await sendMail({
      to: email,
      subject: "Verify your email",
      html: `
        <h1>Welcome to our platform!</h1>
        <p>Please click the link below to verify your email:</p>
        <a href="${verificationLink}">Verify Email</a>
      `,
    })

    return NextResponse.json(
      { message: "User created successfully. Please check your email to verify your account." },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error in signup:", error)
    return NextResponse.json({ error: "An error occurred during signup" }, { status: 500 })
  }
}