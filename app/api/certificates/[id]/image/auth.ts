import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import fs from "fs/promises";
import path from "path";

// ✅ Directory where user data is stored
const dataDirectory = path.join(process.cwd(), "data");

// ✅ NextAuth configuration with CredentialsProvider
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // 🚫 Missing credentials
        }

        try {
          const usersData = await fs.readFile(path.join(dataDirectory, "users.json"), "utf8");
          const users = JSON.parse(usersData);

          const user = users.find((u: any) => u.email === credentials.email);
          if (!user) {
            return null; // 🚫 User not found
          }

          const isPasswordValid = await compare(credentials.password, user.password);
          if (!isPasswordValid) {
            return null; // 🚫 Invalid password
          }

          // ✅ Return user object on successful authentication
          return { id: user.id, name: user.name, email: user.email };
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // 🚫 Return null on error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id; // ✅ Attach user ID to JWT token
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id; // ✅ Attach token ID to session user
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin", // ✅ Custom sign-in page
  },
};

// ✅ Initialize NextAuth with authOptions
const handler = NextAuth(authOptions);

// ✅ Export handler for GET and POST requests (no duplicate authOptions export)
export { handler as GET, handler as POST };
export type { authOptions }; // ✅ Use type export if needed without causing duplication
