import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

export const authOptions : NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
          credentials: {
            email: {
              label: "Email",
              type: "email",
              placeholder: "example@example.com",
            },
            password: {
              label: "Password",
              type: "password",
            },
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials.password) return null
    
            const user = await prisma.user.findUnique({ where: { email: credentials.email } })
    
            if (!user) return null
    
            const decode = await bcrypt.compare(credentials.password, user.password)
            if (!decode) return null
    
            return {
              name: user.name,
              id: user.id,
            }
          },
        }),
        Google({
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET
        })
      ],
      callbacks: {
        jwt({ token, user }) {
          if (!user) return token
    
          return {
            ...token,
            id: user.id,
          }
        },
        session({ session, token }) {
          return {
            ...session,
            id: token.id,
          }
        },
        redirect() {
          return "/profile"
        },
      },
}