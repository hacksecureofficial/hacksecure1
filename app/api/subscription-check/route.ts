import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Get the user email from the session cookie
    const cookieStore = cookies()
    const userEmail = cookieStore.get('userEmail')?.value

    if (!userEmail) {
      return NextResponse.json({
        vip_subscription: false,
        message: "User not logged in"
      })
    }

    // Read users.json
    const filePath = path.join(process.cwd(), "users.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const users = JSON.parse(fileContents)
    
    // Find the logged-in user
    const currentUser = users.find(user => user.email === userEmail)
    console.log("Current user:", currentUser) // Debug log

    if (!currentUser) {
      return NextResponse.json({
        vip_subscription: false,
        message: "User not found"
      })
    }

    return NextResponse.json({
      vip_subscription: currentUser.vip_subscription === true,
      message: currentUser.vip_subscription ? "VIP subscription is active" : "No active VIP subscription",
      debug: {
        user: currentUser.name,
        email: currentUser.email,
        subscription: currentUser.vip_subscription
      }
    })
  } catch (error) {
    console.error("Error checking subscription:", error)
    return NextResponse.json({ 
      error: "Failed to check subscription status",
      details: error.message 
    }, { status: 500 })
  }
}