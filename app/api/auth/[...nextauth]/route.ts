import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import fs from "fs/promises"
import path from "path"

const dataDirectory = path.join(process.cwd(), "data")

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          const usersData = await fs.readFile(path.join(dataDirectory, "users.json"), "utf8")
          const users = JSON.parse(usersData)

          const user = users.find((u: { email: string }) => u.email === credentials.email)
          if (!user) return null

          const isPasswordValid = await compare(credentials.password, user.password)
          if (!isPasswordValid) return null

          return { id: user.id, name: user.name, email: user.email }
        } catch (err) {
          console.error("Error during authorization:", err)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id
      return session
    },
  },
  pages: {
    signIn: "/signin",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST, authOptions } // ✅ Exporting authOptions to fix the import error
