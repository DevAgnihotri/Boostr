import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';
 

export const authoptions =  NextAuth({
    providers: [
      // OAuth authentication providers...
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
      // Enable Google provider (requires GOOGLE_ID and GOOGLE_SECRET in env)
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
    //   AppleProvider({
    //     clientId: process.env.APPLE_ID,
    //     clientSecret: process.env.APPLE_SECRET
    //   }),
    //   FacebookProvider({
    //     clientId: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET
    //   }),
    //   // Passwordless / email sign in
    //   EmailProvider({
    //     server: process.env.MAIL_SERVER,
    //     from: 'NextAuth.js <no-reply@example.com>'
    //   }),
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        try {
          // Only handle DB user creation for OAuth providers we support
          if (account?.provider === "github" || account?.provider === "google") {
            await connectDb()
            // use user.email which is provided by NextAuth
            const userEmail = user?.email
            if (!userEmail) return true
            const currentUser = await User.findOne({ email: userEmail })
            if (!currentUser) {
              // Create a new user with a default username from email
              await User.create({
                email: userEmail,
                username: userEmail.split("@")[0],
              })
            }
          }
          return true
        } catch (err) {
          console.error('Error in signIn callback:', err)
          // Let NextAuth handle the error path; deny sign-in on unexpected errors
          return false
        }
      },
      
      async session({ session, user, token }) {
        try {
          // Ensure DB is connected in serverless envs
          await connectDb()
          const userEmail = session?.user?.email
          if (!userEmail) return session
          const dbUser = await User.findOne({ email: userEmail })
          if (dbUser) {
            session.user.name = dbUser.username
          } else if (session.user?.email) {
            // Fallback to email localpart if DB user not yet created
            session.user.name = session.user.email.split("@")[0]
          }
        } catch (err) {
          console.error('Error in session callback:', err)
        }
        return session
      },
    } 
  })

  export { authoptions as GET, authoptions as POST}