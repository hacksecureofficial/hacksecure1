// /api/user-status.js (Backend API)

import { getSession } from "next-auth"; // Example using NextAuth for session management
import { getUserByEmail } from "../../lib/db"; // You would replace this with your DB logic

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch user data from DB or other source based on the session email
    const user = await getUserByEmail(session.user.email); // Customize this function to match your DB structure

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the subscription status (assuming `vip_subscription` is a boolean in your DB)
    return res.status(200).json({ vip_subscription: user.vip_subscription || false });
  } catch (error) {
    console.error("Error fetching user subscription status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
