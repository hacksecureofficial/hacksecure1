import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import fs from "fs/promises"
import path from "path"

// Path to the users.json file
const dataDirectory = path.join(process.cwd(), "data")

// Define NextAuth configuration
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Read users.json data
          const usersData = await fs.readFile(path.join(dataDirectory, "users.json"), "utf8")
          const users = JSON.parse(usersData)

          // Find the user with the matching email
          const user = users.find((u: any) => u.email === credentials.email)
          if (!user) {
            return null // User not found
          }

          // Validate the provided password
          const isPasswordValid = await compare(credentials.password, user.password)
          if (!isPasswordValid) {
            return null // Invalid password
          }

          // Return user object on successful authentication
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        } catch (error) {
          console.error("Error reading users.json:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id // Attach user ID to the token
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id // Attach token ID to the session
      }
      return session
    },
  },
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
}

// Export GET and POST handlers for NextAuth
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
