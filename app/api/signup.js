// pages/api/signup.js
import { db } from "../../src/db"; // Import the db connection

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { uniqueName, email, password, gender } = req.body;

    // Validate input fields
    if (!uniqueName || !email || !password || !gender) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Hash the password
    const passwordHash = hashPassword(password); // Simple password hash (use a real hashing library like bcrypt in production)

    try {
      // Insert data into the database
      const result = await db
        .insertInto("users") // Assuming a "users" table
        .values({
          uniqueName,
          email,
          passwordHash,
          gender,
          vipSubscription: false, // Default to false
        })
        .execute();

      return res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to create user." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// Password hash function (use bcrypt or another hashing library in production)
function hashPassword(password) {
  return password; // This is a placeholder for real password hashing
}
